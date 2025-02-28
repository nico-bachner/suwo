import { Client, isFullPageOrDatabase } from '@notionhq/client'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'

export default async function Page() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  if (!process.env.NOTION_HISTORY_DATABASE_ID) {
    throw new Error('Missing NOTION_HISTORY_DATABASE_ID')
  }

  const { results } = await notion.databases.query({
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
        {results.map((row) => {
          if (!isFullPageOrDatabase(row)) {
            throw new Error('Not a full page or database')
          }

          const yearColumn = row.properties['Year']

          if (yearColumn.type != 'title') {
            throw new Error('Year is not a title')
          }

          if (!yearColumn.title.length) {
            throw new Error('Year title is not a single element')
          }

          const [text] = yearColumn.title as RichTextItemResponse[]

          const year = text.plain_text

          return (
            <Link key={year} href={`/history/${year}`} className="p-1 text-xl">
              {year}
            </Link>
          )
        })}
      </div>
    </main>
  )
}
