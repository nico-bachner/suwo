import { fetchHistory } from './fetch_history'

export const fetchHistoryYearPage = async (year: number) => {
  const data = await fetchHistory()

  return data.find(
    ({ properties }) =>
      properties.Year.type === 'number' && properties.Year.number === year,
  )
}
