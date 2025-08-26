import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client'

import { getHistoryPageTitle } from '@/features/marketing/history/get_history_page_title'
import { RichText } from '@/features/marketing/history/rich_text'

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
            <RichText
              key={block.id}
              as="h2"
              richText={block.heading_1.rich_text}
            />
          )
        case 'heading_2':
          return (
            <RichText
              key={block.id}
              as="h3"
              richText={block.heading_2.rich_text}
            />
          )
        case 'paragraph':
          return (
            <RichText
              key={block.id}
              as="p"
              richText={block.paragraph.rich_text}
            />
          )
        case 'bulleted_list_item':
          return (
            <RichText
              key={block.id}
              as="p"
              richText={block.bulleted_list_item.rich_text}
            />
          )
        default:
          return null
      }
    })}
  </main>
)
