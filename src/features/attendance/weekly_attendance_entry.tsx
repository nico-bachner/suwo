'use client'

import { Spinner } from '@/design_system/spinner'
import { Attendance, Profile } from '@/generated/prisma'

import { getProfileScreenName } from '../profile/utils/get_profile_screen_name'
import { WeeklyAttendanceEntryStatus } from './weekly_attendance_entry_status'

type WeeklyAttendanceEntryProps = {
  year: Attendance['year']
  semester: Attendance['semester']
  week: Attendance['week']
  profile: Profile
  present: boolean | null
}

export const WeeklyAttendanceEntry = ({
  year,
  semester,
  week,
  profile,
  present,
}: WeeklyAttendanceEntryProps) => (
  <div className="odd:bg-neutral-6 flex flex-row items-center">
    <p className="flex flex-1 flex-row gap-2 px-4 font-bold">
      <span className="text-neutral-2">{getProfileScreenName(profile)}</span>
      <span className="text-neutral-3">{profile.instrument_name}</span>
    </p>

    <WeeklyAttendanceEntryStatus
      year={year}
      semester={semester}
      week={week}
      user_id={profile.user_id}
      present={present}
    />
  </div>
)

export const WeeklyAttendanceEntrySkeleton = () => (
  <div className="odd:bg-neutral-6 flex flex-row items-center">
    <p className="flex flex-1 flex-row gap-2 px-4 font-bold">
      <span className="text-neutral-2">Loading...</span>
      <span className="text-neutral-3">Loading...</span>
    </p>

    <Spinner className="stroke-neutral-2 box-content h-6 w-6 px-4 py-3" />
  </div>
)
