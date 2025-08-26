import {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

/**
 * Extracts the title from a Notion page object.
 *
 * @param page - The Notion page object.
 * @returns - If successful, array of Rich Text Items to be consumed by the
 *   RichText component. Otherwise, null.
 */
export const getPageTitle = (
  page: PageObjectResponse,
): RichTextItemResponse[] | null => {
  const title = Object.values(page.properties).find(
    (property) => property.type === 'title',
  )

  if (!title) {
    return null
  }

  return title.title
}
