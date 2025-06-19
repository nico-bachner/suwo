import { Metadata } from 'next'
import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { Divider } from '@/design_system/divider'
import { fetchHistoryPageMetadata } from '@/lib/notion/fetch_history_page_metadata'
import { fetchHistoryYears } from '@/lib/notion/fetch_history_years'

export const generateMetadata = async (): Promise<Metadata> =>
  await fetchHistoryPageMetadata()

export default async function Page() {
  const { title } = await fetchHistoryPageMetadata()
  const years = await fetchHistoryYears()

  return (
    <PageLayout title={title} className="flex flex-col items-center">
      {years
        .join(' - ')
        .split(' ')
        .map((value, index) =>
          value === '-' ? (
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
