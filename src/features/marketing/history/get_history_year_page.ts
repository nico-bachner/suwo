import { PageObjectResponse } from '@notionhq/client'

export const getHistoryYearPage = (
  history: PageObjectResponse[],
  year: number,
) =>
  history.find(
    ({ properties }) =>
      properties.Year.type === 'number' && properties.Year.number === year,
  )
