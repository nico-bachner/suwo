import { Metadata } from 'next'

import { fetchHistoryYears } from '@/features/marketing/history/fetch_history_years'
import { HistoryYearsPage } from '@/lib/pages/history_years_page'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'History',
  description: "SUWO's history and milestones over the years.",
}

export default async function Page() {
  const years = await fetchHistoryYears()

  return <HistoryYearsPage years={years} />
}
