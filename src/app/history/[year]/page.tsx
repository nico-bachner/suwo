import { Client, isFullBlock } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notFound } from 'next/navigation'

import { Params } from '@/types/next'

import { getHistory } from '../get_history'

type PageProps = {
  params: Params<{
    year: string
  }>
}

export default async function Page({ params }: PageProps) {
  const data = await getHistory()
  const { year } = await params

  const page = data.find(
    ({ properties }) =>
      properties['Year'].type == 'number' &&
      properties['Year'].number == parseInt(year),
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

  const getTitle = (page: PageObjectResponse) => {
    const { Title, Year } = page.properties

    if (Title.type == 'title' && Title.title.length > 0) {
      return Title.title[0].plain_text
    }

    if (Year.type == 'number') {
      return Year.number
    }
  }

  return (
    <main className="prose">
      <h1>{getTitle(page)}</h1>

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
            if (block.paragraph.rich_text.length > 0) {
              return (
                <p key={block.id}>{block.paragraph.rich_text[0].plain_text}</p>
              )
            }
          default:
            return null
        }
      })}
    </main>
  )
}

export const generateStaticParams = async () => {
  const data = await getHistory()

  return data
    .map(
      ({ properties }) =>
        properties['Year'].type == 'number' && properties['Year'].number,
    )
    .filter((number) => number)
    .map((year) => ({
      year: year?.toString(),
    }))
}
