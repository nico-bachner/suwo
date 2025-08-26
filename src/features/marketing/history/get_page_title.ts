import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * Extracts the title from a Notion page object.
 *
 * @param page - The Notion page object.
 * @returns - If successful, array of Rich Text Items to be consumed by the
 *   RichText component. Otherwise, null.
 */
export const getPageTitle = (page: PageObjectResponse) => {
  const title = Object.values(page.properties).find(
    (property) => property.type === 'title',
  )

  if (!title) {
    return null
  }

  return {
    rich_text: title.title,
    plain_text: title.title.map((text) => text.plain_text).join(''),
  }
}
