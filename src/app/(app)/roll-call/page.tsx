import { redirect } from 'next/navigation'

import { fetchCurrentWeekRollCallPath } from '@/features/roll_call/fetch_current_week_roll_call_path'
import { RollCallScreen } from '@/features/roll_call/roll_call_screen'

export default async function Page() {
  const currentWeekRollCallPath = await fetchCurrentWeekRollCallPath()

  if (currentWeekRollCallPath) {
    redirect(currentWeekRollCallPath)
  }

  return <RollCallScreen />
}
