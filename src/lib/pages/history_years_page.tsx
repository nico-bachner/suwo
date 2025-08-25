import Link from 'next/link'

import { getHistoryPagesYearAlignment } from '@/features/marketing/history/get_history_pages_year_alignment'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'

type HistoryYearsPageProps = {
  years: number[]
}

export const HistoryYearsPage = ({ years }: HistoryYearsPageProps) => (
  <main className="prose">
    <h1 className="text-center">SUWO&apos;s History</h1>

    <div className="grid w-full grid-flow-dense grid-cols-3 gap-4">
      {years.map((value, index) => (
        <Link
          key={value}
          href={routes.HISTORY_YEAR(value)}
          className={cn(
            'flex aspect-square items-center justify-center rounded-full border font-black backdrop-blur transition-colors',
            getHistoryPagesYearAlignment(index),
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
