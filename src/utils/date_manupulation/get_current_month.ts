/* eslint-disable no-magic-numbers */
import { Month } from './month'

export const getCurrentMonth = () => {
  const month = new Date().getMonth()

  switch (month) {
    case 1:
      return Month.January
    case 2:
      return Month.February
    case 3:
      return Month.March
    case 4:
      return Month.April
    case 5:
      return Month.May
    case 6:
      return Month.June
    case 7:
      return Month.July
    case 8:
      return Month.August
    case 9:
      return Month.September
    case 10:
      return Month.October
    case 11:
      return Month.November
    case 12:
      return Month.December
    default:
      throw new Error('Invalid month')
  }
}
