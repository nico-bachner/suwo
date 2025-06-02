import { fetchJSON } from '../fetch_json'
import { getCurrentYear } from './get_current_year'
import { getMidsemBreak } from './get_midsem_break'
import { getTeachingDates } from './get_teaching_dates'
import { KeyDate } from './types'

export const getCurrentWeek = async () => {
  const currentYear = getCurrentYear()

  const keyDates = await fetchJSON<Record<string, KeyDate>[]>(
    `https://www.sydney.edu.au/content/dam/students/files/university-calendar/${currentYear}.json`,
  )

  const { startDate: teachingDatesStartDate } = getTeachingDates(keyDates)
  const { startDate: midsemStartDate } = getMidsemBreak(keyDates)

  const currentDate = new Date()

  if (!teachingDatesStartDate || !midsemStartDate) {
    return undefined
  }

  const weeksBetween =
    (currentDate.getTime() - teachingDatesStartDate.getTime()) /
    (7 * 24 * 60 * 60 * 1000)

  if (currentDate.getTime() > midsemStartDate.getTime()) {
    return Math.floor(weeksBetween)
  }

  return Math.ceil(weeksBetween)
}
