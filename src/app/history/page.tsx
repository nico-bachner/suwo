import { Client, isFullDatabase } from '@notionhq/client'
import Link from 'next/link'

import { getHistory } from './get_history'

const getPageMetadata = async () => {
  if (!process.env.NOTION_HISTORY_DATABASE_ID) {
    throw new Error('Missing NOTION_HISTORY_DATABASE_ID')
  }

  const { databases } = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const page = await databases.retrieve({
    database_id: process.env.NOTION_HISTORY_DATABASE_ID,
  })

  if (!isFullDatabase(page)) {
    throw new Error('History database is malformed')
  }

  if (!page.title) {
    throw new Error('Missing title for History database')
  }

  if (!page.description) {
    throw new Error('Missing description for History database')
  }

  return {
    title: page.title[0].plain_text,
    description: page.description[0].plain_text,
  }
}

export const generateMetadata = async () => await getPageMetadata()

export default async function Page() {
  const { title, description } = await getPageMetadata()
  const data = await getHistory()

  return (
    <main className="flex flex-col items-center gap-12">
      <div className="prose text-center">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="flex flex-col items-center">
        {data
          .map(
            ({ properties }) =>
              properties['Year'].type == 'number' && properties['Year'].number,
          )
          .filter((number) => number)
          .join(' - ')
          .split(' ')
          .map((value, index) =>
            value == '-' ? (
              <hr key={index} className="h-12 w-px bg-gray-100" />
            ) : (
              <Link
                key={value}
                href={`/history/${value}`}
                className="p-1 text-xl"
              >
                {value}
              </Link>
            ),
          )}
      </div>
    </main>
  )
}
