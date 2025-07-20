'use client'

import { useQuery } from '@tanstack/react-query'

import { BASE_URL } from '@/config'
import { queries } from '@/routes'

import { useWeeklyAttendancesQuery } from './query_weekly_attendances'
import { WeeklyAttendances } from './types'
import {
  WeeklyAttendanceEntry,
  WeeklyAttendanceEntrySkeleton,
} from './weekly_attendance_entry'
import { WeeklyAttendanceNavigation } from './weekly_attendance_navigation'
import { WeeklyAttendanceQRCodeDialog } from './weekly_attendance_qr_code_dialog'

export const WeeklyAttendance = ({
  year,
  semester,
  week,
}: WeeklyAttendances) => {
  const { data: profiles, error, isPending } = useQuery(queries.profilesQuery())
  const { attendances } = useWeeklyAttendancesQuery({
    year,
    semester,
    week,
  })

  if (error) {
    throw new Error(`Failed to fetch profiles: ${error.message}`)
  }

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1 className="text-center">Roll Call</h1>
      <p>
        {attendances
          ? `Week ${week} (${attendances.length} present)`
          : `Week ${week}`}
      </p>

      <div className="flex w-full max-w-screen-sm flex-col">
        {isPending
          ? Array.from({ length: 10 }).map((_, index) => (
              <WeeklyAttendanceEntrySkeleton key={index} />
            ))
          : profiles.map((profile) => (
              <WeeklyAttendanceEntry
                key={profile.user_id}
                year={year}
                semester={semester}
                week={week}
                profile={profile}
                present={
                  attendances
                    ? attendances.some(
                        (attendance) => attendance.user_id === profile.user_id,
                      )
                    : null
                }
              />
            ))}
      </div>

      <WeeklyAttendanceNavigation year={year} semester={semester} week={week} />

      <WeeklyAttendanceQRCodeDialog
        value={`${BASE_URL}/roll-call/${year}/${semester}/${week}`}
        className="sticky right-4 self-end max-lg:bottom-20 lg:fixed lg:top-12 lg:right-12"
      />
    </div>
  )
}
