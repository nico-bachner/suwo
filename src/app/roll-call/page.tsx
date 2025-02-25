import { getQueryBuilder } from '@/neon'
import { Member, Table, Week } from '@/types/db'
import { SearchParams } from '@/types/next'

import { NewMemberForm } from './new_member_form'
import { QRCode } from './qr_code'
import { Row } from './row'

type PageProps = {
  searchParams: SearchParams<Week>
}

export default async function Page({ searchParams }: PageProps) {
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
  const members: Table<Member> = await sql`SELECT * FROM members`

  return (
    <main className="prose flex w-full flex-col items-center gap-1">
      <h1>Roll Call – Week {week}</h1>

      <QRCode
        value={`${process.env.NEXT_PUBLIC_URL}/roll-call${searchParams.toString()}`}
        className="fixed right-4 bottom-4"
      />

      <div className="flex w-full max-w-screen-sm flex-col">
        {members.map(({ id, ...member }) => (
          <Row
            key={id}
            year={parseInt(year)}
            semester={parseInt(semester)}
            week={parseInt(week)}
            id={id}
            {...member}
          />
        ))}
      </div>

      <h2>Not in the list?</h2>
      <p>Enter your details below:</p>

      <NewMemberForm />
    </main>
  )
}
