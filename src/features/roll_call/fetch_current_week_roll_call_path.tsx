import { LINKS } from '@/config'
import { fetchCurrentWeek } from '@/lib/usyd/fetch_current_week'
import { getCurrentSemester } from '@/lib/usyd/get_current_semester'
import { getCurrentYear } from '@/lib/usyd/get_current_year'

export const fetchCurrentWeekRollCallPath = async () => {
  const year = getCurrentYear()
  const currentSemester = getCurrentSemester()
  const week = await fetchCurrentWeek()

  if (week) {
    return [
      LINKS.ROLL_CALL.href,
      year.toString(),
      currentSemester,
      week.toString(),
    ].join('/')
  }
}
