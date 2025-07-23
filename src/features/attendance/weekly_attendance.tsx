'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Container } from '@/design_system/container'
import { TextInput } from '@/design_system/text_input'
import { queries } from '@/queries'
import { routes } from '@/routes'

import { getProfileScreenName } from '../profile/utils/get_profile_screen_name'
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
  } = useQuery(queries.PROFILES())
  const { data: attendances } = useQuery(
    queries.WEEKLY_ATTENDANCES({ year, semester, week }),
  )
  const [query, setQuery] = useState('')

  if (profilesError) {
    throw new Error(`Failed to fetch data: ${profilesError.message}`)
  }

  return (
    <Container size="sm" className="prose">
      <h1 className="text-center">Attendance Sheet</h1>
      <p className="text-neutral-3 text-center">
        {attendances
          ? `Week ${week} (${attendances.length} present)`
          : `Week ${week}`}
      </p>

      <TextInput
        name="search"
        label="Search"
        type="search"
        onChange={({ target }) => {
          setQuery(target.value)
        }}
        placeholder="Search by name or instrument"
        className="mb-6"
      />

      <div className="flex flex-col">
        {isProfilesPending
          ? Array.from({ length: 20 }).map((_, index) => (
              <WeeklyAttendanceEntrySkeleton key={index} />
            ))
          : profiles
              .filter(
                (profile) =>
                  getProfileScreenName(profile)
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  profile.instrument_name
                    ?.toLowerCase()
                    .includes(query.toLowerCase()),
              )
              .map((profile) => (
                <WeeklyAttendanceEntry
                  key={profile.user_id}
                  attendanceData={{ year, semester, week }}
                  profile={profile}
                />
              ))}
      </div>

      <WeeklyAttendanceNavigation year={year} semester={semester} week={week} />

      <WeeklyAttendanceQRCodeDialog
        value={routes.WEEKLY_ATTENDANCES({ year, semester, week })}
        className="sticky right-4 self-end max-lg:bottom-20 lg:fixed lg:top-12 lg:right-12"
      />
    </Container>
  )
}
