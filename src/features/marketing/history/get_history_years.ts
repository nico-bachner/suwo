import { PageObjectResponse } from '@notionhq/client'

export const getHistoryYears = (history: PageObjectResponse[]) =>
  history
    .map(
      ({ properties }) =>
        properties.Year.type === 'number' && properties.Year.number,
    )
    .filter((number): number is number => Boolean(number))
    .sort((a, b) => b - a)
