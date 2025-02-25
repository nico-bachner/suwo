import Link from 'next/link'

import { getQueryBuilder } from '@/db/query'
import { History, Table } from '@/db/types'

export default async function Page() {
  const sql = getQueryBuilder()
  const data: Table<Pick<History, 'year'>> =
    await sql`SELECT year FROM history ORDER BY year DESC`

  return (
    <main className="flex flex-col items-center">
      <div className="prose">
        <h1 className="text-center">{`SUWO's History`}</h1>
      </div>

      <div className="flex flex-col items-center">
        {data
          .map(({ year }) => year)
          .join(' - ')
          .split(' ')
          .map((item, index) => {
            if (item == '-') {
              return <hr key={index} className="h-12 w-px bg-gray-100" />
            }

            const year = parseInt(item)

            return (
              <Link
                key={year}
                href={`/history/${year}`}
                className="p-1 text-xl"
              >
                {year}
              </Link>
            )
          })}
      </div>
    </main>
  )
}
