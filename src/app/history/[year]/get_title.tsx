import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const getTitle = (page: PageObjectResponse) => {
  const { Title, Year } = page.properties

  if (Title.type == 'title' && Title.title.length > 0) {
    return Title.title[0].plain_text
  }

  if (Year.type == 'number') {
    return Year.number?.toString()
  }
}
