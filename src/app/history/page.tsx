import { Client, isFullPage } from '@notionhq/client'
import Link from 'next/link'

export default async function Page() {
  if (!process.env.NOTION_HISTORY_DATABASE_ID) {
    throw new Error('Missing NOTION_HISTORY_DATABASE_ID')
  }

  const { databases } = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const { results } = await databases.query({
    database_id: process.env.NOTION_HISTORY_DATABASE_ID,
    sorts: [
      {
        property: 'Year',
        direction: 'descending',
      },
    ],
  })

  return (
    <main className="flex flex-col items-center">
      <div className="prose">
        <h1 className="text-center">{`SUWO's History`}</h1>
      </div>

      <div className="flex flex-col items-center">
        {results
          .filter((row) => isFullPage(row))
          .map((row) => {
            const yearColumn = row.properties['Year']

            if (yearColumn.type != 'number') {
              throw new Error('Year is not a title')
            }

            return yearColumn.number
          })
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
