import { Metadata } from 'next'
import Link from 'next/link'

import { fetchHistoryPageMetadata } from '@/features/marketing/fetch_history_page_metadata'
import { fetchHistoryYears } from '@/features/marketing/fetch_history_years'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'

export const dynamic = 'error'

export const generateMetadata = async (): Promise<Metadata> =>
  await fetchHistoryPageMetadata()

const getYearAlignment = (index: number) => {
  switch (index % 6) {
    case 0:
      return 'col-start-1 col-span-2 row-span-2 text-[16vw]'
    case 1:
    case 2:
      return 'col-start-3 text-[8vw]'
    case 3:
    case 4:
      return 'col-start-1 text-[8vw]'
    case 5:
      return 'col-start-2 col-span-2 row-span-2 text-[16vw]'
  }
}

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
              getYearAlignment(index),
            )}
            style={{
              color: `oklch(0.7 0.1 ${(index % 360) * 10 + 90})`,
              backgroundColor: `oklch(0.5 0.1 ${(index % 360) * 10 + 90} / 0.8)`,
            }}
          >
            {value}
          </Link>
        ))}
      </div>
    </main>
  )
}
