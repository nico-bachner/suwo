import { fetchHistory } from './fetch_history'

export const fetchHistoryYearPage = async (year?: string) => {
  const data = await fetchHistory()

  if (!year) {
    return null
  }

  return data.find(
    ({ properties }) =>
      properties.Year.type === 'number' &&
      properties.Year.number === parseInt(year, 10),
  )
}
