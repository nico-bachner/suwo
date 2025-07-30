import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { MAX_WEEK, MIN_WEEK } from '@/features/usyd_api_wrapper/config'
import { routes } from '@/routes'

import { WeeklyAttendances } from './types'
import { WeeklyAttendanceQRCodeDialog } from './weekly_attendance_qr_code_dialog'

export const WeeklyAttendanceNavigation = ({
  year,
  semester,
  week,
}: WeeklyAttendances) => (
  <div className="bg-neutral-7/80 border-neutral-4/50 fixed bottom-0 w-full border-t backdrop-blur-lg">
    <nav className="mx-auto grid max-w-screen-lg grid-cols-3 items-center gap-2 p-4">
      {week > MIN_WEEK && (
        <Button
          variant="secondary"
          asChild
          className="col-start-1 justify-self-start"
        >
          <Link
            href={routes.WEEKLY_ATTENDANCES({ year, semester, week: week - 1 })}
          >
            <ChevronLeftIcon className="box-content h-5 w-5" />
            <span className="pr-2">Week {week - 1}</span>
          </Link>
        </Button>
      )}

      <WeeklyAttendanceQRCodeDialog
        value={routes.WEEKLY_ATTENDANCES({ year, semester, week })}
        className="col-start-2 justify-self-center"
      />

      {week < MAX_WEEK && (
        <Button
          variant="secondary"
          asChild
          className="col-start-3 justify-self-end"
        >
          <Link
            href={routes.WEEKLY_ATTENDANCES({ year, semester, week: week + 1 })}
          >
            <span className="pl-2">Week {week + 1}</span>
            <ChevronRightIcon className="box-content h-5 w-5" />
          </Link>
        </Button>
      )}
    </nav>
  </div>
)
