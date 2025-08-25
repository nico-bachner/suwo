import { Metadata } from 'next'
import Link from 'next/link'

import { fetchHistoryPageMetadata } from '@/features/marketing/history/fetch_history_page_metadata'
import { fetchHistoryYears } from '@/features/marketing/history/fetch_history_years'
import { getHistoryPageYearAlignment } from '@/features/marketing/history/get_history_page_year_alignment'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'

export const dynamic = 'error'

export const generateMetadata = async (): Promise<Metadata> =>
  await fetchHistoryPageMetadata()

export default async function Page() {
  const { title } = await fetchHistoryPageMetadata()
  const years = await fetchHistoryYears()

  return (
    <main className="prose">
      <h1 className="text-center">{title}</h1>

      <div className="grid w-full grid-flow-dense grid-cols-3 gap-4">
        {years.map((value, index) => (
          <Link
            key={value}
            href={routes.HISTORY_YEAR(value)}
            className={cn(
              'flex aspect-square items-center justify-center rounded-full border font-black backdrop-blur transition-colors',
              getHistoryPageYearAlignment(index),
            )}
            style={{
              color: `oklch(0.9 0.15 ${(index % 360) * 10 + 90})`,
              backgroundColor: `oklch(0.6 0.15 ${(index % 360) * 10 + 90} / 0.8)`,
            }}
          >
            {value}
          </Link>
        ))}
      </div>
    </main>
  )
}
