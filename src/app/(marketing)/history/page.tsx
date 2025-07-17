import { Metadata } from 'next'
import Link from 'next/link'

import { Divider } from '@/design_system/divider'
import { fetchHistoryPageMetadata } from '@/lib/notion/fetch_history_page_metadata'
import { fetchHistoryYears } from '@/lib/notion/fetch_history_years'

export const dynamic = 'force-static'

export const generateMetadata = async (): Promise<Metadata> =>
  await fetchHistoryPageMetadata()

export default async function Page() {
  const { title } = await fetchHistoryPageMetadata()
  const years = await fetchHistoryYears()

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1 className="text-center">{title}</h1>

      <div className="flex flex-col items-center">
        {years
          .join(' - ')
          .split(' ')
          .map((value, index) =>
            value === '-' ? (
              <Divider
                key={index}
                orientation="vertical"
                className="bg-neutral-4 h-12"
              />
            ) : (
              <Link
                key={value}
                href={`/history/${value}`}
                className="hover:text-neutral-1 p-1 text-2xl transition-colors"
              >
                {value}
              </Link>
            ),
          )}
      </div>
    </div>
  )
}
