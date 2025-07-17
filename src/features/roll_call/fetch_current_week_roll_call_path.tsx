import { fetchCurrentWeek } from '@/lib/usyd/fetch_current_week'
import { routes } from '@/routes'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

export const fetchCurrentWeekRollCallPath = async () => {
  const year = getCurrentYear()
  const currentSemester = getCurrentSemester()
  const week = await fetchCurrentWeek()

  if (week) {
    const rollCallPath = [routes.ROLL_CALL, year, currentSemester]

    return rollCallPath.join('/')
  }
}
