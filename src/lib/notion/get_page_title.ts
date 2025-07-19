import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * Extracts the title from a Notion page object.
 *
 * @param page - The Notion page object.
 * @returns - The title of the page or undefined if not found.
 */
export const getPageTitle = (page: PageObjectResponse) => {
  const { Title, Year } = page.properties

  if (Title.type === 'title' && Title.title.length > 0) {
    return Title.title[0].plain_text
  }

  if (Year.type === 'number') {
    return Year.number?.toString()
  }
}
