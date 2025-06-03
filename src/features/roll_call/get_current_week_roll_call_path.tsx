import { LINKS } from '@/config'
import { getCurrentSemester } from '@/lib/usyd/get_current_semester'
import { getCurrentWeek } from '@/lib/usyd/get_current_week'
import { getCurrentYear } from '@/lib/usyd/get_current_year'

export const getCurrentWeekRollCallPath = async () => {
  const year = getCurrentYear()
  const currentSemester = getCurrentSemester()
  const week = await getCurrentWeek()

  if (week) {
    return [
      LINKS.ROLL_CALL.href,
      year.toString(),
      currentSemester,
      week.toString(),
    ].join('/')
  }
}
