import { redirect } from 'next/navigation'

type KeyDate = {
  title: string
  startDate: string
  endDate: string
}
type ApiResponse = Record<string, KeyDate>[]

function weeksBetween(d1: Date, d2: Date) {
  return Math.floor((d2.getTime() - d1.getTime()) / (7 * 24 * 60 * 60 * 1000))
}

export const revalidate = 86400 // 1 day

export default async function Page() {
  try {
    const currentYear = new Date().getFullYear()
    const currentSemester = new Date().getMonth() < 7 ? 1 : 2
    const keyDatesJson = await fetch(
      `https://www.sydney.edu.au/content/dam/students/files/university-calendar/${currentYear}.json`,
    )
    const keyDates: ApiResponse = await keyDatesJson.json()

    const currentSemesterResponse = keyDates.find((obj) =>
      obj.hasOwnProperty(`${currentYear}-s${currentSemester}c-teaching-dates`),
    )

    const currentSemesterBreakResponse = keyDates.find((obj) =>
      obj.hasOwnProperty(`${currentYear}-s${currentSemester}c-break`),
    )
    if (!currentSemesterResponse || !currentSemesterBreakResponse) {
      return (
        <main className="prose">
          <h1>Latest Roll Call</h1>
          <p>There are no key dates for the current semester</p>
        </main>
      )
    }
    const currentSemesterObject =
      currentSemesterResponse[
        `${currentYear}-s${currentSemester}c-teaching-dates`
      ]
    const currentSemesterBreakObject =
      currentSemesterBreakResponse[`${currentYear}-s${currentSemester}c-break`]

    const currentDate = new Date()
    let currentWeek =
      1 + weeksBetween(new Date(currentSemesterObject.startDate), currentDate)
    if (currentDate > new Date(currentSemesterBreakObject.startDate)) {
      currentWeek--
    }
    if (currentWeek > 13) {
      currentWeek = 13
    }
    if (currentWeek < 1) {
      currentWeek = 1
    }
    redirect(
      `/roll-call?year=${currentYear}&semester=${currentSemester}&week=${currentWeek}`,
    )
  } catch {
    redirect(`/roll-call`)
  }
}
