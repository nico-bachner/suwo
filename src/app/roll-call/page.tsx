import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { headers } from 'next/headers'
import Link from 'next/link'

import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
import { TextInput } from '@/components/ui/text_input'
import { getQueryBuilder } from '@/db/query'
import { Instrument, Member, RollCall, Table, Week } from '@/db/types'
import { SearchParams } from '@/types/next'

import {
  getCurrentSemester,
  getCurrentWeek,
  getCurrentYear,
} from './get_current_week'
import { MembersList } from './members_list'
import { NewMemberForm } from './new_member_form'
import { QRCodeDialog } from './qr_code_dialog'

const MAX_WEEK = 13

type PageProps = {
  searchParams: SearchParams<Week>
}

export default async function Page({ searchParams }: PageProps) {
  const headersList = await headers()
  const host = headersList.get('host')
  const {
    year: yearParam,
    semester: semesterParam,
    week: weekParam,
  } = await searchParams

  const year = yearParam ? parseInt(yearParam) : getCurrentYear()
  const semester = semesterParam
    ? parseInt(semesterParam)
    : getCurrentSemester()
  const week = weekParam ? parseInt(weekParam) : await getCurrentWeek()

  if (semester < 1 || semester > 2 || week < 1 || week > MAX_WEEK) {
    return (
      <main className="prose">
        <h1>Roll Call</h1>

        <p>Please select a week:</p>

        <div className="mx-auto flex w-full max-w-screen-sm flex-row flex-wrap gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
            <Link
              key={i}
              href={`/roll-call?year=${year}&semester=${semester}&week=${i + 1}`}
              className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-900 text-xl hover:bg-gray-800"
            >
              {i}
            </Link>
          ))}
        </div>
      </main>
    )
  }

  const sql = getQueryBuilder()
  const members: Table<RollCall & Member> = await sql`
    SELECT *
    FROM (
      SELECT *
      FROM roll_call
      WHERE year = ${year} 
      AND semester = ${semester} 
      AND week = ${week}
    ) as roll_call
    RIGHT JOIN members
    ON roll_call.member = members.id
    ORDER BY family_name, given_name
  `

  const instruments = (await sql`
    SELECT name, family
    FROM instruments
    ORDER BY family, name
  `) as Table<Instrument>

  return (
    <main className="prose flex w-full flex-col items-center gap-6">
      <h1>
        Roll Call
        <br />
        Week {week}
      </h1>

      <nav className="mx-auto grid w-full max-w-screen-sm grid-cols-2 gap-4">
        {week > 1 && (
          <Link
            href={`/roll-call?year=${year}&semester=${semester}&week=${week - 1}`}
            className="col-start-1 flex flex-row items-center justify-self-start rounded-md hover:bg-gray-900"
          >
            <ChevronLeftIcon className="box-content h-5 w-5 stroke-gray-300 p-2" />
            <span className="py-2 pr-4 text-gray-300">Week {week - 1}</span>
          </Link>
        )}

        {week < MAX_WEEK && (
          <Link
            href={`/roll-call?year=${year}&semester=${semester}&week=${week + 1}`}
            className="col-start-2 flex flex-row items-center justify-self-end rounded-md hover:bg-gray-900"
          >
            <span className="py-2 pl-4 text-gray-300">Week {week + 1}</span>
            <ChevronRightIcon className="box-content h-5 w-5 stroke-gray-300 p-2" />
          </Link>
        )}
      </nav>

      <MembersList data={members} year={year} semester={semester} week={week} />

      <h2>Not in the list?</h2>
      <p>Enter your details below:</p>

      <NewMemberForm instruments={instruments} />

      <QRCodeDialog
        value={`${host}/roll-call?year=${year}&semester=${semester}&week=${week}`}
        className="fixed right-4 bottom-4"
      />
    </main>
  )
}
