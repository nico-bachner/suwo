import Link from 'next/link'

import { Button } from '@/design_system/button'
import { MAX_WEEK, MIN_WEEK } from '@/features/usyd_api_wrapper/config'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'
import { useShareableURL } from '@/utils/use_shareable_url'

import { WeeklyAttendances } from './types'
import { WeeklyAttendanceQRCodeDialog } from './weekly_attendance_qr_code_dialog'

export const WeeklyAttendanceNavigation = ({
  year,
  semester,
  week,
  className,
}: WeeklyAttendances & {
  className?: string
}) => {
  const { shareableURL: currentWeekShareableURL } = useShareableURL(
    routes.WEEKLY_ATTENDANCES({ year, semester, week }),
  )

  return (
    <nav
      className={cn(
        'bg-neutral-5/20 border-neutral-2/20 rounded-full border backdrop-blur',
        'mx-auto h-16 w-fit px-3',
        'grid grid-cols-3 items-center',
        className,
      )}
    >
      {week > MIN_WEEK && (
        <Button
          variant="secondary"
          className="col-start-1 justify-self-start"
          asChild
        >
          <Link
            href={routes.WEEKLY_ATTENDANCES({
              year,
              semester,
              week: week - 1,
            })}
          >
            Week {week - 1}
          </Link>
        </Button>
      )}

      {currentWeekShareableURL && (
        <Button
          variant="secondary"
          className="col-start-2 justify-self-center"
          asChild
        >
          <WeeklyAttendanceQRCodeDialog value={currentWeekShareableURL} />
        </Button>
      )}

      {week < MAX_WEEK && (
        <Button
          variant="secondary"
          className="col-start-3 justify-self-end"
          asChild
        >
          <Link
            href={routes.WEEKLY_ATTENDANCES({
              year,
              semester,
              week: week + 1,
            })}
          >
            Week {week + 1}
          </Link>
        </Button>
      )}
    </nav>
  )
}
