import { Client, isFullPage } from '@notionhq/client'

export const getHistory = async () => {
  if (!process.env.NOTION_HISTORY_DATABASE_ID) {
    throw new Error('Missing NOTION_HISTORY_DATABASE_ID')
  }

  const { databases } = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const { results } = await databases.query({
    database_id: process.env.NOTION_HISTORY_DATABASE_ID,
    sorts: [
      {
        property: 'Year',
        direction: 'descending',
      },
    ],
  })

  return results.filter((row) => isFullPage(row))
}
