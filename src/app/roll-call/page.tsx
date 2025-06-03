import { redirect } from 'next/navigation'

import { getCurrentWeekRollCallPath } from '@/features/roll_call/get_current_week_roll_call_path'
import { RollCallScreen } from '@/features/roll_call/roll_call_screen'

export default async function Page() {
  const currentWeekRollCallPath = await getCurrentWeekRollCallPath()

  if (currentWeekRollCallPath) {
    redirect(currentWeekRollCallPath)
  }

  return <RollCallScreen />
}
