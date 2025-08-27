import { isFullBlock } from '@notionhq/client'
import { notFound } from 'next/navigation'

import { fetchHistory } from '@/features/marketing/history/fetch_history'
import { getHistoryYearPage } from '@/features/marketing/history/get_history_year_page'
import { getHistoryYears } from '@/features/marketing/history/get_history_years'
import { getPageTitle } from '@/features/marketing/history/get_page_title'
import { HistoryYearPage } from '@/lib/pages/history_year_page'
import { GeneratePageMetadata, GenerateStaticParams } from '@/utils/next'
import { blocks } from '@/utils/notion'

export const generateStaticParams: GenerateStaticParams<
  '/history/[year]'
> = async () => {
  const history = await fetchHistory()
  const years = getHistoryYears(history)

  return years.map((year) => ({
    year: year.toString(),
  }))
}

export const generateMetadata: GeneratePageMetadata<
  '/history/[year]'
> = async ({ params }) => {
  const { year } = await params

  const history = await fetchHistory()
  const page = getHistoryYearPage(history, parseInt(year))

  if (!page) {
    return notFound()
  }

  const title = getPageTitle(page)

  if (!title) {
    return {
      title: `History - ${year}`,
    }
  }

  return {
    title: `${title.plain_text} - ${year}`,
    description: `A look back at what Suwo achieved in the year ${year}.`,
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
