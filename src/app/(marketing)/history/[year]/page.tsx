import { notFound } from 'next/navigation'
import z from 'zod'

import { FOUNDING_YEAR } from '@/config'
import { fetchHistoryYearPage } from '@/features/marketing/history/fetch_history_year_page'
import { fetchHistoryYears } from '@/features/marketing/history/fetch_history_years'
import {
  GenerateMetadata,
  GenerateStaticParams,
  PageFileProps,
} from '@/utils/next_types'
import { fetchNotionPageContent } from '@/utils/notion/fetch_page_content'
import { getPageTitle } from '@/utils/notion/get_page_title'

export const dynamic = 'error'

export const generateStaticParams: GenerateStaticParams = async () => {
  const years = await fetchHistoryYears()

  return years.map((year) => ({
    year: year.toString(),
  }))
}

export const generateMetadata: GenerateMetadata = async ({ params }) => {
  const { data, success } = z
    .object({
      year: z.coerce
        .number()
        .int()
        .min(FOUNDING_YEAR)
        .max(new Date().getFullYear()),
    })
    .safeParse(await params)

  if (!success) {
    return notFound()
  }

  const page = await fetchHistoryYearPage(data.year)

  if (!page) {
    return notFound()
  }

  return {
    title: getPageTitle(page),
  }
}

export default async function Page({ params }: PageFileProps) {
  const { data, success } = z
    .object({
      year: z.coerce
        .number()
        .int()
        .min(FOUNDING_YEAR)
        .max(new Date().getFullYear()),
    })
    .safeParse(await params)

  if (!success) {
    return notFound()
  }

  const page = await fetchHistoryYearPage(data.year)

  if (!page) {
    return notFound()
  }

  const content = await fetchNotionPageContent(page.id)

  return (
    <main className="prose">
      <h1>{getPageTitle(page) ?? data.year}</h1>

      {content.map((block) => {
        switch (block.type) {
          case 'heading_1':
            return (
              <h2 key={block.id}>{block.heading_1.rich_text[0]?.plain_text}</h2>
            )
          case 'heading_2':
            return (
              <h3 key={block.id}>{block.heading_2.rich_text[0]?.plain_text}</h3>
            )
          case 'paragraph':
            return (
              <p key={block.id}>{block.paragraph.rich_text[0]?.plain_text}</p>
            )

          default:
            return null
        }
      })}
    </main>
  )
}
