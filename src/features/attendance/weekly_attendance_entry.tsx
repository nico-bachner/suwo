'use client'

import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { Attendance, Profile } from '@/generated/prisma'

import { getProfileScreenName } from '../profile/utils/get_profile_screen_name'
import { useLogAttendanceMutation } from './mutation_log_attendance'

type WeeklyAttendanceEntryProps = {
  year: Attendance['year']
  semester: Attendance['semester']
  week: Attendance['week']
  profile: Profile
  present: boolean
}

export const WeeklyAttendanceEntry = ({
  year,
  semester,
  week,
  profile,
  present,
}: WeeklyAttendanceEntryProps) => {
  const { logAttendance } = useLogAttendanceMutation()

  return (
    <div className="odd:bg-neutral-6 flex flex-row items-center">
      <p className="flex flex-1 flex-row gap-2 px-4 font-bold">
        <span className="text-neutral-2">{getProfileScreenName(profile)}</span>
        <span className="text-neutral-3">{profile.instrument_name}</span>
      </p>

      {present ? (
        <CheckIcon className="stroke-positive box-content h-6 w-6 px-4 py-3" />
      ) : (
        <button
          type="submit"
          className="focus:ring-neutral-4 cursor-pointer px-4 py-3"
          onClick={async () => {
            await logAttendance({
              year,
              semester,
              week,
              user_id: profile.user_id,
            })
          }}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
