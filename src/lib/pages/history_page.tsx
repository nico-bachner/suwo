import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client'

import { getPageTitle } from '@/utils/notion/get_page_title'

type HistoryPageProps = {
  page: PageObjectResponse
  blocks: BlockObjectResponse[]
}

export const HistoryPage = ({ page, blocks }: HistoryPageProps) => (
  <main className="prose">
    <h1>{getPageTitle(page)}</h1>

    {blocks.map((block) => {
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
