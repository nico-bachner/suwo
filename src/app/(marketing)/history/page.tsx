import { Metadata } from 'next'
import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { Divider } from '@/design_system/divider'
import { fetchHistory } from '@/lib/notion/fetch_history'
import { fetchHistoryPageMetadata } from '@/lib/notion/fetch_history_page_metadata'

export const generateMetadata = async (): Promise<Metadata> =>
  await fetchHistoryPageMetadata()

export default async function Page() {
  const { title } = await fetchHistoryPageMetadata()
  const data = await fetchHistory()

  return (
    <PageLayout title={title} className="flex flex-col items-center">
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
