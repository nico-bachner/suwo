import { getCurrentSemester } from './get_current_semester'
import { getCurrentYear } from './get_current_year'
import { getSemesterNumber } from './get_semester_number'
import { KeyDate } from './types'

export const getMidsemBreak = (keyDates: Record<string, KeyDate>[]) => {
  const currentYear = getCurrentYear()
  const currentSemester = getCurrentSemester()
  const currentSemesterNumber = getSemesterNumber(currentSemester)

  if (!currentSemesterNumber) {
    return {
      startDate: undefined,
      endDate: undefined,
    }
  }

  const keyDateKey = `${currentYear}-s${currentSemesterNumber}c-break`

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
