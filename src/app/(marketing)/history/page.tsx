import { Metadata } from 'next'
import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { NOTION_HISTORY_DB_ID } from '@/config'
import { Divider } from '@/design_system/divider'
import { getHistory } from '@/lib/notion/get_history'
import { getNotionDB } from '@/lib/notion/get_notion_db'

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, description } = await getNotionDB(NOTION_HISTORY_DB_ID)

  return {
    title: title[0].plain_text,
    description: description[0].plain_text,
  }
}

export default async function Page() {
  const { title } = await getNotionDB(NOTION_HISTORY_DB_ID)
  const data = await getHistory()

  return (
    <PageLayout
      title={title[0].plain_text}
      className="flex flex-col items-center"
    >
      {data
        .map(
          ({ properties }) =>
            properties.Year.type == 'number' && properties.Year.number,
        )
        .filter((number) => number)
        .join(' - ')
        .split(' ')
        .map((value, index) =>
          value == '-' ? (
            <Divider
              key={index}
              orientation="vertical"
              className="bg-primary-3 h-12"
            />
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
    </PageLayout>
  )
}
