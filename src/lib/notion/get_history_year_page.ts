import { getHistory } from './get_history'

export const getHistoryYearPage = async (year?: string) => {
  const data = await getHistory()

  if (!year) {
    return null
  }

  return data.find(
    ({ properties }) =>
      properties.Year.type === 'number' &&
      properties.Year.number === parseInt(year, 10),
  )
}
