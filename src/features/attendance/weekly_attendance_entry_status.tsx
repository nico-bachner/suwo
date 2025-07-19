'use client'

import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { Spinner } from '@/design_system/spinner'

import { useLogAttendanceMutation } from './mutation_log_attendance'
import { Attendance } from './types'

type WeeklyAttendanceEntryStatusProps = Attendance & {
  present: boolean | null
}

export const WeeklyAttendanceEntryStatus = ({
  year,
  semester,
  week,
  user_id,
  present,
}: WeeklyAttendanceEntryStatusProps) => {
  const { logAttendance } = useLogAttendanceMutation()

  switch (present) {
    case null:
      return (
        <Spinner className="stroke-neutral-2 box-content h-6 w-6 px-4 py-3" />
      )
    case true:
      return (
        <CheckIcon className="stroke-positive box-content h-6 w-6 px-4 py-3" />
      )
    case false:
      return (
        <button
          className="focus:ring-neutral-4 cursor-pointer px-4 py-3"
          onClick={async () => {
            await logAttendance({
              year,
              semester,
              week,
              user_id,
            })
          }}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      )
  }
}
