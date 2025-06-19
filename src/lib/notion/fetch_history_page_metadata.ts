import { NOTION_HISTORY_DB_ID } from '@/config'

import { fetchNotionDatabase } from './fetch_notion_database'

export const fetchHistoryPageMetadata = async () => {
  const { title, description } = await fetchNotionDatabase(NOTION_HISTORY_DB_ID)

  return {
    title: title[0].plain_text,
    description: description[0].plain_text,
  }
}
