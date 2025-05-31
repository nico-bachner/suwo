import { isFullPage } from '@notionhq/client'

import { NOTION_HISTORY_DB_ID } from '@/config'

import { getNotionClient } from './get_notion_client'

export const getHistory = async () => {
  const { databases } = getNotionClient()

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
