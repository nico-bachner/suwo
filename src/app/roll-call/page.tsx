import { headers } from 'next/headers'

import { getQueryBuilder } from '@/db/query'
import { Member, RollCall, Table, Week } from '@/db/types'
import { SearchParams } from '@/types/next'

import { MembersList } from './members_list'
import { NewMemberForm } from './new_member_form'
import { QRCodeDialog } from './qr_code_dialog'

type PageProps = {
  searchParams: SearchParams<Week>
}

export default async function Page({ searchParams }: PageProps) {
  const headersList = await headers()
  const host = headersList.get('host')
  const { year, semester, week } = await searchParams

  if (!year || !semester || !week) {
    return (
      <main className="prose">
        <h1>Roll Call</h1>

        <p>Please select a year, semester, and week.</p>

        <pre>
          <code>/roll-call?year=2025&semester=1&week=1</code>
        </pre>
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

  return (
    <main className="prose flex w-full flex-col items-center gap-6">
      <h1>
        Roll Call
        <br />
        Week {week}
      </h1>

      <MembersList
        data={members}
        year={parseInt(year)}
        semester={parseInt(semester)}
        week={parseInt(week)}
      />

      <h2>Not in the list?</h2>
      <p>Enter your details below:</p>

      <NewMemberForm />

      <QRCodeDialog
        value={`${host}/roll-call?year=${year}&semester=${semester}&week=${week}`}
        className="fixed right-4 bottom-4"
      />
    </main>
  )
}
