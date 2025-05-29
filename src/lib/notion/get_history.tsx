import { Client, isFullPage } from '@notionhq/client'

import { NOTION_HISTORY_DB_ID } from '@/config'

export const getHistory = async () => {
  if (!NOTION_HISTORY_DB_ID) {
    throw new Error('Missing NOTION_HISTORY_DATABASE_ID')
  }

  const { databases } = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const { results } = await databases.query({
    database_id: NOTION_HISTORY_DB_ID,
    sorts: [
      {
        property: 'Year',
        direction: 'descending',
      },
    ],
  })

  return results.filter((row) => isFullPage(row))
}
