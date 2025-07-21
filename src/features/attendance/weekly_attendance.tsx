'use client'

import { useQuery } from '@tanstack/react-query'

import { BASE_URL } from '@/config'
import { Prose } from '@/design_system/prose'
import { queries } from '@/routes'

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
  const {
    data: profiles,
    error: profilesError,
    isPending: isProfilesPending,
  } = useQuery(queries.profilesQuery())
  const { data: attendances } = useQuery(
    queries.WEEKLY_ATTENDANCES({ year, semester, week }),
  )

  if (profilesError) {
    throw new Error(`Failed to fetch data: ${profilesError.message}`)
  }

  return (
    <Prose>
      <h1 className="text-center">Attendance Sheet</h1>
      <p className="text-neutral-3 text-center">
        {attendances
          ? `Week ${week} (${attendances.length} present)`
          : `Week ${week}`}
      </p>

      <div className="flex flex-col">
        {isProfilesPending
          ? Array.from({ length: 20 }).map((_, index) => (
              <WeeklyAttendanceEntrySkeleton key={index} />
            ))
          : profiles.map((profile) => (
              <WeeklyAttendanceEntry
                key={profile.user_id}
                attendanceData={{ year, semester, week }}
                profile={profile}
              />
            ))}
      </div>

      <WeeklyAttendanceNavigation year={year} semester={semester} week={week} />

      <WeeklyAttendanceQRCodeDialog
        value={`${BASE_URL}/roll-call/${year}/${semester}/${week}`}
        className="sticky right-4 self-end max-lg:bottom-20 lg:fixed lg:top-12 lg:right-12"
      />
    </Prose>
  )
}
