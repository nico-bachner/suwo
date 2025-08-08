import { getCurrentYear } from '@/utils/date_manipulation'

import { getCurrentSemesterSessionCode } from './get_current_semester_session_code'
import { KeyDate } from './types'

export const getMidsemBreak = (keyDates: Record<string, KeyDate>[]) => {
  const currentYear = getCurrentYear()
  const currentSemesterSessionCode = getCurrentSemesterSessionCode()

  const keyDateKey = `${currentYear}-${currentSemesterSessionCode}-break`

  const keyDate = keyDates.find((obj) => Object.keys(obj).includes(keyDateKey))

  if (!keyDate) {
    throw new Error(
      "There are no dates for the current semester's mid-semester break",
    )
  }

  const { startDate, endDate } = keyDate[keyDateKey]

  return {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  }
}
