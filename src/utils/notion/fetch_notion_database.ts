import { isFullDatabase } from '@notionhq/client'

import { getNotionClient } from './get_notion_client'

export const fetchNotionDatabase = async (databaseId: string) => {
  const client = getNotionClient()

  const database = await client.databases.retrieve({
    database_id: databaseId,
  })

  if (!isFullDatabase(database)) {
    throw new Error('Database is malformed')
  }

  return database
}
