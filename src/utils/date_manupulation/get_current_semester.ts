import { $Enums } from '@/generated/prisma'

import { getCurrentMonth } from './get_current_month'
import { Month } from './month'

export const getCurrentSemester = (): $Enums.Semester => {
  const currentMonth = getCurrentMonth()

  switch (currentMonth) {
    case Month.January:
    case Month.February:
    case Month.March:
    case Month.April:
    case Month.May:
    case Month.June:
      return $Enums.Semester.SEMESTER_1
    case Month.July:
    case Month.August:
    case Month.September:
    case Month.October:
    case Month.November:
    case Month.December:
      return $Enums.Semester.SEMESTER_2
  }
}
