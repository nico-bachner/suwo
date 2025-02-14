import Link from 'next/link'

import { History, Table } from '@/db'
import { getQueryBuilder } from '@/neon'

export default async function Page() {
  const sql = getQueryBuilder()
  const data: Table<Pick<History, 'year'>> =
    await sql`SELECT year FROM history ORDER BY year DESC`

  return (
    <main className="flex flex-col items-center gap-8 px-6 py-8">
      <h1 className="font-serif text-6xl font-extrabold">{`SUWO's History`}</h1>

      {data.map(({ year }) => (
        <Link key={year} href={`/history/${year}`}>
          {year}
        </Link>
      ))}
    </main>
  )
}
