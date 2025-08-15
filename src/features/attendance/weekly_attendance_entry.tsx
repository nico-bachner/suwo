'use client'

import { useQuery } from '@tanstack/react-query'

import { SkeletonText } from '@/design_system/skeleton'
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
    <div className="bg-neutral-5/80 border-neutral-4/80 flex h-16 flex-row items-center rounded-full border pr-4 pl-8 backdrop-blur">
      <p className="flex flex-1 flex-row items-center gap-4 font-bold">
        <span className="text-neutral-2">{getProfileScreenName(profile)}</span>

        {profile.instruments.length > 0 && (
          <span className="text-neutral-3">
            {profile.instruments.slice(0, 3).join(', ')}
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
  <div className="bg-neutral-5/80 border-neutral-4/80 flex h-16 flex-row items-center rounded-full border pr-4 pl-8 backdrop-blur">
    <div className="flex flex-1 flex-row gap-2 px-4">
      <SkeletonText className="h-5 w-20" />
      <SkeletonText className="h-5 w-10" />
    </div>

    <WeeklyAttendanceEntryStatusSkeleton />
  </div>
)
