import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageLayout } from '@/components/server/page_layout'
import { NextParams } from '@/lib/next/types'
import { fetchHistoryYearPage } from '@/lib/notion/fetch_history_year_page'
import { fetchHistoryYears } from '@/lib/notion/fetch_history_years'
import { fetchNotionPageContent } from '@/lib/notion/fetch_page_content'
import { getPageTitle } from '@/lib/notion/get_page_title'

type Params = {
  year: string
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const years = await fetchHistoryYears()

  return years.map((year) => ({
    year: year.toString(),
  }))
}

type PageProps = {
  params: NextParams<Params>
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { year } = await params
  const page = await fetchHistoryYearPage(year)

  if (!page) {
    return notFound()
  }

  return {
    title: getPageTitle(page),
  }
}

export default async function Page({ params }: PageProps) {
  const { year } = await params
  const page = await fetchHistoryYearPage(year)

  if (!page) {
    return notFound()
  }

  const content = await fetchNotionPageContent(page.id)

  return (
    <PageLayout title={getPageTitle(page) ?? year} className="prose">
      {content.map((block) => {
        switch (block.type) {
          case 'heading_1':
            return (
              <h2 key={block.id}>{block.heading_1.rich_text[0].plain_text}</h2>
            )
          case 'heading_2':
            return (
              <h3 key={block.id}>{block.heading_2.rich_text[0].plain_text}</h3>
            )
          case 'paragraph':
            return (
              <p key={block.id}>{block.paragraph.rich_text[0].plain_text}</p>
            )

          default:
            return null
        }
      })}
    </PageLayout>
  )
}
