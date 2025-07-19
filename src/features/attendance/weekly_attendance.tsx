'use client'

import { BASE_URL } from '@/config'
import { Profile } from '@/generated/prisma'

import { useWeeklyAttendancesQuery } from './query_weekly_attendances'
import { WeeklyAttendances } from './types'
import { WeeklyAttendanceEntry } from './weekly_attendance_entry'
import { WeeklyAttendanceNavigation } from './weekly_attendance_navigation'
import { WeeklyAttendanceQRCodeDialog } from './weekly_attendance_qr_code_dialog'

type WeeklyAttendanceProps = WeeklyAttendances & {
  profiles: Profile[]
}

export const WeeklyAttendance = ({
  year,
  semester,
  week,
  profiles,
}: WeeklyAttendanceProps) => {
  const { attendances, error, isPending } = useWeeklyAttendancesQuery({
    year,
    semester,
    week,
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <div className="prose mx-auto max-w-screen-sm px-4 py-8">
        <h1 className="text-center">Roll Call</h1>
        <p>{`Week ${week} (${attendances.length} present)`}</p>

        <div className="flex w-full max-w-screen-sm flex-col">
          {profiles.map((profile) => (
            <WeeklyAttendanceEntry
              key={profile.user_id}
              year={year}
              semester={semester}
              week={week}
              profile={profile}
              present={attendances.some(
                (attendance) => attendance.user_id === profile.user_id,
              )}
            />
          ))}
        </div>

        <WeeklyAttendanceNavigation
          year={year}
          semester={semester}
          week={week}
        />

        <WeeklyAttendanceQRCodeDialog
          value={`${BASE_URL}/roll-call/${year}/${semester}/${week}`}
          className="sticky right-4 self-end max-lg:bottom-20 lg:fixed lg:top-12 lg:right-12"
        />
      </div>
    </div>
  )
}
