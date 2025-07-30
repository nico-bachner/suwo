import { Metadata } from 'next'
import Link from 'next/link'

import { PageContainer } from '@/design_system/container'
import { Divider } from '@/design_system/divider'
import { Heading } from '@/design_system/typography'
import { fetchHistoryPageMetadata } from '@/features/marketing/fetch_history_page_metadata'
import { fetchHistoryYears } from '@/features/marketing/fetch_history_years'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> =>
  await fetchHistoryPageMetadata()

export default async function Page() {
  const { title } = await fetchHistoryPageMetadata()
  const years = await fetchHistoryYears()

  return (
    <PageContainer size="sm" className="flex flex-col items-center gap-8">
      <Heading as="h1" variant="primary">
        {title}
      </Heading>

      <div className="flex flex-col items-center">
        {years
          .join(' - ')
          .split(' ')
          .map((value, index) =>
            value === '-' ? (
              <Divider
                key={index}
                orientation="vertical"
                className="bg-neutral-4 h-8"
              />
            ) : (
              <Link
                key={value}
                href={routes.HISTORY_YEAR(value)}
                className="hover:text-neutral-1 p-1 text-2xl transition-colors"
              >
                {value}
              </Link>
            ),
          )}
      </div>
    </PageContainer>
  )
}
