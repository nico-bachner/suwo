import { isFullBlock } from '@notionhq/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchHistory } from '@/features/marketing/history/fetch_history'
import { getHistoryPageTitle } from '@/features/marketing/history/get_history_page_title'
import { getHistoryYearPage } from '@/features/marketing/history/get_history_year_page'
import { getHistoryYears } from '@/features/marketing/history/get_history_years'
import { HistoryYearPage } from '@/lib/pages/history_year_page'
import { GenerateStaticParams } from '@/utils/next_types'
import { blocks } from '@/utils/notion'

export const dynamic = 'error'

export const generateStaticParams: GenerateStaticParams = async () => {
  const history = await fetchHistory()
  const years = getHistoryYears(history)

  return years.map((year) => ({
    year: year.toString(),
  }))
}

export const generateMetadata = async ({
  params,
}: PageProps<'/history/[year]'>): Promise<Metadata> => {
  const { year } = await params

  const history = await fetchHistory()
  const page = getHistoryYearPage(history, parseInt(year))

  if (!page) {
    return notFound()
  }

  return {
    title: getHistoryPageTitle(page),
  }
}

export default async function Page({ params }: PageProps<'/history/[year]'>) {
  const { year } = await params

  const history = await fetchHistory()
  const page = getHistoryYearPage(history, parseInt(year))

  if (!page) {
    return notFound()
  }

  const { results } = await blocks.children.list({
    block_id: page.id,
  })

  return <HistoryYearPage page={page} blocks={results.filter(isFullBlock)} />
}
