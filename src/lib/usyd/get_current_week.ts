import { MAX_WEEK } from '@/config'

import { fetchJSON } from '../../utils/fetch_json'
import { getCurrentYear } from './get_current_year'
import { getMidsemAdjustedWeek } from './get_midsem_adjusted_week'
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

  if (!teachingDatesStartDate || !midsemStartDate) {
    return undefined
  }

  const currentDate = new Date()

  const currentWeek =
    (currentDate.getTime() - teachingDatesStartDate.getTime()) /
    (7 * 24 * 60 * 60 * 1000)

  const midsemAdjustedWeek = getMidsemAdjustedWeek(currentWeek, midsemStartDate)

  if (midsemAdjustedWeek > MAX_WEEK) {
    return undefined
  }

  return midsemAdjustedWeek
}
