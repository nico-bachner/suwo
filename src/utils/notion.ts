import { Client } from '@notionhq/client'

export const getNotionClient = () => {
  if (!process.env.NOTION_TOKEN) {
    throw new Error('Missing NOTION_TOKEN')
  }

  return new Client({
    auth: process.env.NOTION_TOKEN,
  })
}

export const { databases, blocks } = getNotionClient()
