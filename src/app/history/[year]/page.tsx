import { Client, isFullBlock } from '@notionhq/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageLayout } from '@/components/server/page_layout'
import { getHistory } from '@/lib/notion/get_history'
import { getPageTitle } from '@/lib/notion/get_page_title'
import { NextParams } from '@/lib/types'

type Params = {
  year: string
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const data = await getHistory()

  return data
    .map(
      ({ properties }) =>
        properties.Year.type == 'number' && properties.Year.number,
    )
    .filter((number): number is number => Boolean(number))
    .map((year) => ({
      year: year.toString(),
    }))
}

type PageProps = {
  params: NextParams<Params>
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const data = await getHistory()
  const { year } = await params

  if (!year) {
    notFound()
  }

  const page = data.find(
    ({ properties }) =>
      properties.Year.type == 'number' &&
      properties.Year.number == parseInt(year, 10),
  )

  if (!page) {
    return notFound()
  }

  return {
    title: getPageTitle(page),
  }
}

export default async function Page({ params }: PageProps) {
  const data = await getHistory()
  const { year } = await params

  if (!year) {
    notFound()
  }

  const page = data.find(
    ({ properties }) =>
      properties.Year.type == 'number' &&
      properties.Year.number == parseInt(year, 10),
  )

  if (!page) {
    return notFound()
  }

  const { blocks } = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const { results } = await blocks.children.list({
    block_id: page.id,
  })

  return (
    <PageLayout title={getPageTitle(page) ?? year} className="prose">
      {results.map((block) => {
        if (!isFullBlock(block)) {
          return null
        }

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
