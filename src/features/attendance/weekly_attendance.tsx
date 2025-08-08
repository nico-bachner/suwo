'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { SearchInput } from '@/design_system/input'
import { queries } from '@/lib/queries'
import { search } from '@/utils/search'

import { WeeklyAttendances } from './types'
import {
  WeeklyAttendanceEntry,
  WeeklyAttendanceEntrySkeleton,
} from './weekly_attendance_entry'
import { WeeklyAttendanceNavigation } from './weekly_attendance_navigation'

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
    <>
      <WeeklyAttendanceNavigation
        year={year}
        semester={semester}
        week={week}
        className="fixed right-0 bottom-0 left-0 z-10"
      />

      <main className="prose">
        <h1>
          Attendance Sheet
          <br />
          {year} Semester {semester}
          <br />
          Week {week}
        </h1>

        <p className="text-xl">
          Present: {`${attendances?.length ?? 0}/${profiles?.length ?? 0}`}
        </p>

        <SearchInput
          value={query}
          onChange={({ target }) => {
            setQuery(target.value)
          }}
          placeholder="Search by name or instrument"
        />

        <div className="flex flex-col">
          {isProfilesPending
            ? Array.from({ length: 20 }).map((_, index) => (
                <WeeklyAttendanceEntrySkeleton key={index} />
              ))
            : search({
                data: profiles,
                keys: ['given_name', 'family_name', 'instrument_name'],
                query,
              }).map((profile) => (
                <WeeklyAttendanceEntry
                  key={profile.user_id}
                  attendanceData={{ year, semester, week }}
                  profile={profile}
                />
              ))}
        </div>
      </main>
    </>
  )
}
