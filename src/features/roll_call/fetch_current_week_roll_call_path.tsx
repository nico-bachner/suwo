import { routes } from '@/routes'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

import { fetchCurrentWeek } from '../usyd_api_wrapper/fetch_current_week'

export const fetchCurrentWeekRollCallPath = async () => {
  const year = getCurrentYear()
  const currentSemester = getCurrentSemester()
  const week = await fetchCurrentWeek()

  if (week) {
    const rollCallPath = [routes.ROLL_CALL, year, currentSemester]

    return rollCallPath.join('/')
  }
}
