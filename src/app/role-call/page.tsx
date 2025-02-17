import { Member, Table } from '@/db'
import { getQueryBuilder } from '@/neon'

import { Form } from './form'

type PageProps = {
  searchParams: Promise<{
    year?: string
    semester?: string
    week?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { year, semester, week } = await searchParams

  if (!year || !semester || !week) {
    return (
      <main className="prose">
        <h1>Role Call</h1>

        <p>Please select a year, semester, and week.</p>

        <pre>
          <code>/role-call?year=2025&semester=1&week=1</code>
        </pre>
      </main>
    )
  }

  const sql = getQueryBuilder()
  const members: Table<Member> = await sql`SELECT * FROM members`

  return (
    <main className="flex w-full flex-col items-center">
      <div className="prose">
        <h1>Role Call – Week {week}</h1>
      </div>

      <div className="flex w-full max-w-screen-sm flex-col">
        {members.map(({ id, ...member }) => (
          <Form
            key={id}
            year={parseInt(year)}
            semester={parseInt(semester)}
            week={parseInt(week)}
            id={id}
            {...member}
          />
        ))}
      </div>
    </main>
  )
}
