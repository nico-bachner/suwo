import { Metadata } from 'next'

import { fetchHistory } from '@/features/marketing/history/fetch_history'
import { getHistoryYears } from '@/features/marketing/history/get_history_years'
import { HistoryYearsPage } from '@/lib/pages/history_years_page'

export const metadata: Metadata = {
  title: 'History',
  description: "SUWO's history and milestones over the years.",
}

export default async function Page() {
  const history = await fetchHistory()
  const years = getHistoryYears(history)

  return <HistoryYearsPage years={years} />
}
