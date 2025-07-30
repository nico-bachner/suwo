import { Metadata } from 'next'
import Link from 'next/link'

import { PageContainer } from '@/design_system/container'
import { Heading } from '@/design_system/typography'
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
      return 'col-start-1 col-span-2 row-span-2'
    case 1:
    case 2:
      return 'col-start-3'
    case 3:
    case 4:
      return 'col-start-1'
    case 5:
      return 'col-start-2 col-span-2 row-span-2'
  }
}

export default async function Page() {
  const { title } = await fetchHistoryPageMetadata()
  const years = await fetchHistoryYears()

  return (
    <PageContainer size="md" className="flex flex-col items-center gap-8">
      <Heading as="h1" variant="primary">
        {title}
      </Heading>

      <div className="grid w-full grid-flow-dense grid-cols-3 gap-2">
        {years.map((value, index, array) => (
          <Link
            key={value}
            href={routes.HISTORY_YEAR(value)}
            className={cn(
              'hover:text-neutral-1 bg-neutral-5/80 flex aspect-square items-center justify-center text-4xl font-bold transition-colors',
              getYearAlignment(index),
            )}
            style={{
              color: `oklch(0.8 0.1 ${(array.length - index) * 10 + 30} / 0.8)`,
              backgroundColor: `oklch(0.4 0.1 ${(array.length - index) * 10 + 30} / 0.8)`,
            }}
          >
            {value}
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
