import Link from 'next/link'

import { Container } from '@/design_system/container'
import { WEEKS } from '@/features/usyd_api_wrapper/config'
import { routes } from '@/routes'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

export const AttendanceScreen = () => {
  const currentYear = getCurrentYear()
  const currentSemester = getCurrentSemester()

  return (
    <Container size="sm" className="prose">
      <h1>Attendance</h1>

      <p className="text-center text-5xl font-bold">Come back next semester!</p>

      <p>
        We are currently on break after our semester {currentSemester} concert.
        Come back next semester, or review the semester {currentSemester}{' '}
        attendance sheets linked below.
      </p>

      <div className="flex flex-row flex-wrap gap-1">
        {Array.from({ length: WEEKS }, (_, index) => index + 1).map((week) => (
          <Link
            key={week}
            href={routes.WEEKLY_ATTENDANCES({
              year: currentYear,
              semester: currentSemester,
              week,
            })}
            className="bg-neutral-4 hover:bg-neutral-3 flex h-16 w-16 items-center justify-center rounded-md text-3xl transition-colors"
          >
            {week}
          </Link>
        ))}
      </div>
    </Container>
  )
}
