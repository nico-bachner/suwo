import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchHistoryYearPage } from '@/features/marketing/history/fetch_history_year_page'
import { fetchHistoryYears } from '@/features/marketing/history/fetch_history_years'
import { HistoryPage } from '@/lib/pages/history_page'
import { GenerateStaticParams } from '@/utils/next_types'
import { fetchNotionPageContent } from '@/utils/notion/fetch_page_content'
import { getPageTitle } from '@/utils/notion/get_page_title'

export const dynamic = 'error'

export const generateStaticParams: GenerateStaticParams = async () => {
  const years = await fetchHistoryYears()

  return years.map((year) => ({
    year: year.toString(),
  }))
}

export const generateMetadata = async ({
  params,
}: PageProps<'/history/[year]'>): Promise<Metadata> => {
  const { year } = await params

  const page = await fetchHistoryYearPage(parseInt(year))

  if (!page) {
    return notFound()
  }

  return {
    title: getPageTitle(page),
  }
}

export default async function Page({ params }: PageProps<'/history/[year]'>) {
  const { year } = await params

  const page = await fetchHistoryYearPage(parseInt(year))

  if (!page) {
    return notFound()
  }

  const blocks = await fetchNotionPageContent(page.id)

  return <HistoryPage page={page} blocks={blocks} />
}
