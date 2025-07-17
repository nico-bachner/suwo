import { cache } from 'react'

import { getCurrentYear } from '@/utils/date_manupulation'

import { MAX_WEEK } from './config'
import { getMidsemAdjustedWeek } from './get_midsem_adjusted_week'
import { getMidsemBreak } from './get_midsem_break'
import { getTeachingDates } from './get_teaching_dates'
import { KeyDate } from './types'

// eslint-disable-next-line no-magic-numbers
const MILLISECONDS_IN_A_WEEK = 7 * 24 * 60 * 60 * 1000

export const fetchCurrentWeek = cache(async () => {
  const currentYear = getCurrentYear()

  const response = await fetch(
    `https://www.sydney.edu.au/content/dam/students/files/university-calendar/${currentYear}.json`,
  )

  const keyDates = (await response.json()) as Record<string, KeyDate>[]

  const { startDate: teachingDatesStartDate } = getTeachingDates(keyDates)
  const { startDate: midsemStartDate } = getMidsemBreak(keyDates)

  const currentDate = new Date()

  const currentWeek =
    (currentDate.getTime() - teachingDatesStartDate.getTime()) /
    MILLISECONDS_IN_A_WEEK

  const midsemAdjustedWeek = getMidsemAdjustedWeek(currentWeek, midsemStartDate)

  if (midsemAdjustedWeek > MAX_WEEK) {
    return null
  }

  return midsemAdjustedWeek
})
