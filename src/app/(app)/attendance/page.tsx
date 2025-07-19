import { redirect } from 'next/navigation'

import { AttendanceScreen } from '@/features/attendance/attendance_screen'
import { fetchCurrentWeek } from '@/features/usyd_api_wrapper/fetch_current_week'
import { routes } from '@/routes'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

export default async function Page() {
  const currentWeek = await fetchCurrentWeek()

  if (currentWeek) {
    redirect(
      routes.WEEKLY_ATTENDANCES({
        year: getCurrentYear(),
        semester: getCurrentSemester(),
        week: currentWeek,
      }),
    )
  }

  return <AttendanceScreen />
}
