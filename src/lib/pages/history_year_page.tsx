import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client'

import { getHistoryPageTitle } from '@/features/marketing/history/get_history_page_title'

type HistoryYearPageProps = {
  page: PageObjectResponse
  blocks: BlockObjectResponse[]
}

export const HistoryYearPage = ({ page, blocks }: HistoryYearPageProps) => (
  <main className="prose">
    <h1>{getHistoryPageTitle(page)}</h1>

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
