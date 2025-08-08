import { useQuery } from '@tanstack/react-query'
import z from 'zod'

import { WEEKS } from '@/features/usyd_api_wrapper/config'
import { queries } from '@/lib/queries'
import { ProfileQueryResult } from '@/lib/queries/profile_query'
import { getCurrentSemester } from '@/utils/date_manipulation'
import { Semester } from '@/utils/date_manipulation/semester'

export const useProfileAttendanceRate = (
  attendances: ProfileQueryResult['attendances'] | undefined,
) => {
  const { data } = useQuery(queries.CURRENT_WEEK())
  const currentYear = new Date().getFullYear()
  const currentSemester = getCurrentSemester()

  if (!attendances) {
    return 0
  }

  const recentAttendances = attendances.filter(({ year, semester, week }) => {
    const attendanceSemester = z.enum(Semester).parse(semester)

    const currentWeek = data ?? 0

    switch (currentSemester) {
      case Semester.SEMESTER_1:
        return (
          (year === currentYear &&
            attendanceSemester === Semester.SEMESTER_1 &&
            week < currentWeek) ||
          (year === currentYear - 1 &&
            attendanceSemester === Semester.SEMESTER_2 &&
            week >= currentWeek)
        )
      case Semester.SEMESTER_2:
        return (
          (year === currentYear &&
            attendanceSemester === Semester.SEMESTER_1 &&
            week >= currentWeek) ||
          (year === currentYear &&
            attendanceSemester === Semester.SEMESTER_2 &&
            week < currentWeek)
        )
      default:
        return false
    }
  }).length

  return Math.round((recentAttendances / WEEKS) * 100)
}
