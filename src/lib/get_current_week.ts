import { fetchJSON } from './fetch_json'

export const getCurrentYear = () => new Date().getFullYear()
export const getCurrentSemester = () => (new Date().getMonth() < 7 ? 1 : 2)

type KeyDate = {
  title: string
  startDate: string
  endDate: string
}

export const getCurrentWeek = async () => {
  const currentYear = getCurrentYear()
  const currentSemester = getCurrentSemester()

  const keyDates = await fetchJSON<Record<string, KeyDate>[]>(
    `https://www.sydney.edu.au/content/dam/students/files/university-calendar/${currentYear}.json`,
  )

  const currentSemesterResponse = keyDates.find((obj) =>
    Object.keys(obj).includes(
      `${currentYear}-s${currentSemester}c-teaching-dates`,
    ),
  )

  const currentSemesterBreakResponse = keyDates.find((obj) =>
    Object.keys(obj).includes(`${currentYear}-s${currentSemester}c-break`),
  )

  if (!currentSemesterResponse || !currentSemesterBreakResponse) {
    throw new Error('There are no key dates for the current semester')
  }

  const currentSemesterObject =
    currentSemesterResponse[
      `${currentYear}-s${currentSemester}c-teaching-dates`
    ]
  const currentSemesterBreakObject =
    currentSemesterBreakResponse[`${currentYear}-s${currentSemester}c-break`]

  const currentDate = new Date()
  const startDate = new Date(currentSemesterObject.startDate)
  const breakDate = new Date(currentSemesterBreakObject.startDate)

  const weeksBetween =
    (currentDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)

  return currentDate.getTime() > breakDate.getTime()
    ? Math.floor(weeksBetween)
    : Math.ceil(weeksBetween)
}
