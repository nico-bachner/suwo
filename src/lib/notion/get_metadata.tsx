import { Client, isFullDatabase } from '@notionhq/client'

import { NOTION_HISTORY_DB_ID } from '@/config'

export const getPageMetadata = async () => {
  if (!NOTION_HISTORY_DB_ID) {
    throw new Error('Missing NOTION_HISTORY_DATABASE_ID')
  }

  const { databases } = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const page = await databases.retrieve({
    database_id: NOTION_HISTORY_DB_ID,
  })

  if (!isFullDatabase(page)) {
    throw new Error('History database is malformed')
  }

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
