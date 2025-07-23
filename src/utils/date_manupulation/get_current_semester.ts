import { getCurrentMonth } from './get_current_month'
import { Month } from './month'
import { Semester } from './semester'

export const getCurrentSemester = (): Semester => {
  const currentMonth = getCurrentMonth()

  switch (currentMonth) {
    case Month.January:
    case Month.February:
    case Month.March:
    case Month.April:
    case Month.May:
    case Month.June:
      return Semester.SEMESTER_1
    case Month.July:
    case Month.August:
    case Month.September:
    case Month.October:
    case Month.November:
    case Month.December:
      return Semester.SEMESTER_2
  }
}
