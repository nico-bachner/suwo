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
      <main className="flex flex-col items-center gap-6 p-6">
        <h1 className="font-serif text-4xl font-extrabold">Role Call</h1>
        <p className="text-xl">Please select a year, semester, and week.</p>
        <pre className="rounded-md bg-gray-800 px-4 py-3">
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
        {members.map(({ id, name }) => (
          <Form
            key={id}
            year={parseInt(year)}
            semester={parseInt(semester)}
            week={parseInt(week)}
            id={id}
            name={name}
          />
        ))}
      </div>
    </main>
  )
}
