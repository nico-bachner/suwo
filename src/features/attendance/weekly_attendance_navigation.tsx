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
    <div className={cn('px-4', className)}>
      <nav
        className={cn(
          'bg-neutral-7/50 border-neutral-5/50 h-20 rounded-full border px-5 backdrop-blur',
          'mx-auto grid w-full max-w-screen-sm grid-cols-3 items-center gap-2',
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
    </div>
  )
}
