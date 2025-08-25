import { isFullPage } from '@notionhq/client'

import { NOTION_HISTORY_DB_ID } from '@/config'
import { databases } from '@/utils/notion'

export const fetchHistory = async () => {
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
