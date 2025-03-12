import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { QRCodeDialog } from '@/components/ui/qr_code_dialog'
import { MAX_WEEK } from '@/config'
import { getInstruments } from '@/lib/db/queries/get_instruments'
import { getQueryBuilder } from '@/lib/db/query'
import { Member, RollCall, Table } from '@/lib/db/types'
import { Params } from '@/types/next'

import { NewMemberForm } from './create_member_form'
import { MembersList } from './members_list'

type PageProps = {
  params: Params<Pick<RollCall, 'year' | 'semester' | 'week'>>
}

export default async function Page({ params }: PageProps) {
  const headersList = await headers()
  const host = headersList.get('host')
  const {
    year: yearParam,
    semester: semesterParam,
    week: weekParam,
  } = await params

  if (!yearParam || !semesterParam || !weekParam) {
    redirect(`/roll-call`)
  }

  const year = parseInt(decodeURIComponent(yearParam))
  const semester = parseInt(decodeURIComponent(semesterParam))
  const week = parseInt(decodeURIComponent(weekParam))

  if (semester < 1 || semester > 2 || week < 1 || week > MAX_WEEK) {
    redirect(`/roll-call`)
  }

  const sql = getQueryBuilder()
  const members = (await sql`
    SELECT id, given_name, family_name, instrument, present
    FROM (
      SELECT 
        member, 
        TRUE AS present
      FROM roll_call
      WHERE year = ${year} 
      AND semester = ${semester} 
      AND week = ${week}
    ) as roll_call
    RIGHT JOIN members
    ON roll_call.member = members.id
    ORDER BY given_name, family_name
  `) as Table<Member & { present?: boolean }>

  const instruments = await getInstruments()

  return (
    <main className="prose flex w-full flex-col items-center gap-6">
      <h1>
        Roll Call
        <br />
        <span className="text-gray-500">Week {week}</span>
      </h1>

      <nav className="mx-auto grid w-full max-w-screen-sm grid-cols-2 gap-4">
        {week > 1 && (
          <Link
            href={`/roll-call/${year}/${semester}/${week - 1}`}
            className="col-start-1 flex flex-row items-center justify-self-start rounded-md hover:bg-gray-900"
          >
            <ChevronLeftIcon className="box-content h-5 w-5 stroke-gray-300 p-2" />
            <span className="py-2 pr-4 text-gray-300">Week {week - 1}</span>
          </Link>
        )}

        {week < MAX_WEEK && (
          <Link
            href={`/roll-call/${year}/${semester}/${week + 1}`}
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
        value={`${host}/roll-call/${year}/${semester}/${week}`}
        className="fixed right-4 bottom-4"
      />
    </main>
  )
}
