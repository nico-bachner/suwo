'use client'

import { useQuery } from '@tanstack/react-query'

import { Skeleton, SkeletonText } from '@/design_system/skeleton'
import { queries } from '@/lib/queries'

import { getProfileScreenName } from '../profile/utils/get_profile_screen_name'
import { WeeklyAttendanceEntryProps } from './types'
import {
  WeeklyAttendanceEntryStatus,
  WeeklyAttendanceEntryStatusSkeleton,
} from './weekly_attendance_entry_status'

export const WeeklyAttendanceEntry = ({
  attendanceData,
  profile,
}: WeeklyAttendanceEntryProps) => {
  const {
    data: attendances,
    error,
    isPending,
  } = useQuery(queries.WEEKLY_ATTENDANCES(attendanceData))

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div className="odd:bg-neutral-5 even:bg-neutral-7 flex flex-row items-center">
      <p className="flex flex-1 flex-row gap-2 px-4 font-bold">
        <span className="text-neutral-2">{getProfileScreenName(profile)}</span>
        {profile.instruments.length > 0 && (
          <span className="text-neutral-3">
            {profile.instruments.join(', ')}
          </span>
        )}
      </p>

      {isPending ? (
        <WeeklyAttendanceEntryStatusSkeleton />
      ) : (
        <WeeklyAttendanceEntryStatus
          attendanceData={attendanceData}
          profile={profile}
          isPresent={attendances.some(
            (attendance) => attendance.user_id === profile.user_id,
          )}
        />
      )}
    </div>
  )
}

export const WeeklyAttendanceEntrySkeleton = () => (
  <div className="odd:bg-neutral-5 even:bg-neutral-7 flex flex-row items-center">
    <div className="flex flex-1 flex-row gap-2 px-4">
      <SkeletonText className="h-5 w-50" />
      <SkeletonText className="h-5 w-30" />
    </div>

    <div className="px-4 py-3">
      <Skeleton className="stroke-neutral-2 box-content h-6 w-6" />
    </div>
  </div>
)
