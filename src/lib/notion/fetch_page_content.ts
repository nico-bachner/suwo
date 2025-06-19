import { isFullBlock } from '@notionhq/client'

import { getNotionClient } from './get_notion_client'

export const fetchNotionPageContent = async (pageId: string) => {
  const { blocks } = getNotionClient()

  const { results } = await blocks.children.list({
    block_id: pageId,
  })

  return results.filter(isFullBlock)
}
