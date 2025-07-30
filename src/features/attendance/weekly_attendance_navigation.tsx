import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { MAX_WEEK, MIN_WEEK } from '@/features/usyd_api_wrapper/config'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'

import { WeeklyAttendances } from './types'
import { WeeklyAttendanceQRCodeDialog } from './weekly_attendance_qr_code_dialog'

export const WeeklyAttendanceNavigation = ({
  year,
  semester,
  week,
  className,
}: WeeklyAttendances & {
  className?: string
}) => (
  <div
    className={cn(
      'bg-neutral-7/80 border-neutral-4/50 border-t px-4 backdrop-blur-lg',
      className,
    )}
  >
    <nav className="mx-auto grid w-full max-w-screen-lg grid-cols-3 items-center gap-2 py-4">
      {week > MIN_WEEK && (
        <Link
          href={routes.WEEKLY_ATTENDANCES({ year, semester, week: week - 1 })}
          className="col-start-1 flex items-center gap-1 justify-self-start"
        >
          <ChevronLeftIcon className="box-content size-4" />
          <span className="pr-1">Week {week - 1}</span>
        </Link>
      )}

      <WeeklyAttendanceQRCodeDialog
        value={routes.WEEKLY_ATTENDANCES({ year, semester, week })}
        className="col-start-2 justify-self-center"
      />

      {week < MAX_WEEK && (
        <Link
          href={routes.WEEKLY_ATTENDANCES({ year, semester, week: week + 1 })}
          className="col-start-3 flex items-center gap-1 justify-self-end"
        >
          <span className="pl-1">Week {week + 1}</span>
          <ChevronRightIcon className="box-content size-4" />
        </Link>
      )}
    </nav>
  </div>
)
