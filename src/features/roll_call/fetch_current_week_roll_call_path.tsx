import { LINKS } from '@/config'
import { fetchCurrentWeek } from '@/lib/usyd/fetch_current_week'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

export const fetchCurrentWeekRollCallPath = async () => {
  const year = getCurrentYear()
  const currentSemester = getCurrentSemester()
  const week = await fetchCurrentWeek()

  if (week) {
    const rollCallPath = [LINKS.ROLL_CALL.href, year, currentSemester]

    return rollCallPath.join('/')
  }
}
