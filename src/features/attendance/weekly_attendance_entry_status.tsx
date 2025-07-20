'use client'

import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { Skeleton } from '@/design_system/skeleton'

import { useLogAttendanceMutation } from './mutation_log_attendance'
import { WeeklyAttendanceEntryProps } from './types'

type WeeklyAttendanceEntryStatusProps = WeeklyAttendanceEntryProps & {
  isPresent: boolean
}

export const WeeklyAttendanceEntryStatus = ({
  attendanceData,
  profile,
  isPresent,
}: WeeklyAttendanceEntryStatusProps) => {
  const { logAttendance } = useLogAttendanceMutation()

  switch (isPresent) {
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
              ...attendanceData,
              user_id: profile.user_id,
            })
          }}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      )
  }
}

export const WeeklyAttendanceEntryStatusSkeleton = () => (
  <div className="px-4 py-3">
    <Skeleton className="h-6 w-6" />
  </div>
)
