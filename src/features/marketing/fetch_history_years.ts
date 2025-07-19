import { fetchHistory } from './fetch_history'

export const fetchHistoryYears = async () => {
  const history = await fetchHistory()

  return history
    .map(
      ({ properties }) =>
        properties.Year.type === 'number' && properties.Year.number,
    )
    .filter((number): number is number => Boolean(number))
    .sort((a, b) => b - a)
}
