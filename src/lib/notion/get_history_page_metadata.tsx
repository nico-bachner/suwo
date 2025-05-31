import { NOTION_HISTORY_DB_ID } from '@/config'

import { getNotionDB } from './get_notion_db'

export const getHistoryPageMetadata = async () => {
  if (!NOTION_HISTORY_DB_ID) {
    throw new Error('Missing NOTION_HISTORY_DATABASE_ID')
  }

  const page = await getNotionDB(NOTION_HISTORY_DB_ID)

  if (!page.title) {
    throw new Error('Missing title for History database')
  }

  if (!page.description) {
    throw new Error('Missing description for History database')
  }

  return {
    title: page.title[0].plain_text,
    description: page.description[0].plain_text,
  }
}
