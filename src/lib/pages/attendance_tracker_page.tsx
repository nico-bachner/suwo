'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { Button } from '@/design_system/button'
import { Heading } from '@/design_system/typography'
import { getUserDisplayName } from '@/features/user/get_user_display_name'
import { EventDTO } from '@/lib/dtos/event_dto_validator'
import { InstrumentDTO } from '@/lib/dtos/instrument_dto_validator'
import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { queries } from '@/lib/queries'

// Start and end dates from date inputs.
type DateRange = {
  startDate: string
  endDate: string
}

const DateField = ({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) => (
  <label className="flex flex-col gap-1">
    <span className="px-2 text-sm font-semibold">{label}</span>
    <input
      type="date"
      value={value}
      onChange={({ target }) => {
        onChange(target.value)
      }}
      className="bg-neutral-5/80 border-neutral-4/80 text-neutral-2/80 h-12 rounded-full border px-6 backdrop-blur outline-none"
    />
  </label>
)

// Attendnace for one member in the selected date range..
type UserAttendance = {
  userId: string
  name: string
  instrument: string
  attendedCount: number
  attendanceRate: number
  attendanceByEvent: number[]
}

// Attendance tracker data.
type AttendanceTrackerContentProps = {
  events: EventDTO[]
  users: UserDTO[]
  instruments: InstrumentDTO[]
}

//Render attendance tracker UI when date input is complete.
const AttendanceTrackerContent = ({
  events,
  users,
  instruments,
}: AttendanceTrackerContentProps) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | null>(null)

  // Create range for start and end dates.
  const selectedRange = useMemo(() => {
    if (dateRange) {
      return {
        start: new Date(`${dateRange.startDate}T00:00:00.000`).getTime(),
        end: new Date(`${dateRange.endDate}T23:59:59.999`).getTime(),
      }
    }
    return null
  }, [dateRange])

  // Create list of events in the selected range.
  const eventsInRange = useMemo(() => {
    if (!selectedRange) {
      return []
    }

    return events
      .filter((event) => {
        const startsAt = new Date(event.starts_at).getTime()
        return startsAt >= selectedRange.start && startsAt <= selectedRange.end
      })
      .sort(
        (a, b) =>
          new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
      )
  }, [events, selectedRange])

  // Map instrument names to their IDs.
  const instrumentNameById = useMemo(
    () =>
      new Map(
        instruments.map((instrument) => [instrument.id, instrument.name]),
      ),
    [instruments],
  )

  // Create the attendance data for each member.
  const attendanceData = useMemo<UserAttendance[]>(() => {
    if (!selectedRange || eventsInRange.length === 0) {
      return []
    }

    return users
      .map((user) => {
        // Check which events the member attended.
        const attendanceByEvent = eventsInRange.map((event) =>
          event.attendees.includes(user.id) ? 1 : 0,
        )

        // Calculate number of events attended.
        const attendedCount = attendanceByEvent.reduce<number>(
          (sum, value) => sum + value,
          0,
        )

        // Assign instrument(s) to the member.
        const instrumentNames = user.instruments
          .map((instrumentId) => instrumentNameById.get(instrumentId))
          .filter((name): name is string => Boolean(name))
        const instrument =
          instrumentNames.length > 0
            ? instrumentNames.join(', ')
            : 'Non-playing member'

        return {
          userId: user.id,
          name: getUserDisplayName(user),
          instrument,
          attendedCount,
          attendanceRate: Math.round(
            (attendedCount / eventsInRange.length) * 100,
          ),
          attendanceByEvent,
        }
      })
      .filter((user) => user.attendedCount > 0)
      .sort((a, b) => b.attendedCount - a.attendedCount)
  }, [eventsInRange, instrumentNameById, selectedRange, users])

  // Create CSV for the attendance data.
  const csv = useMemo(() => {
    if (eventsInRange.length === 0 || attendanceData.length === 0) {
      return ''
    }

    const headers = [
      'Name',
      'Instrument(s)',
      ...eventsInRange.map(
        (event) =>
          `${event.name} (${new Date(event.starts_at).toLocaleDateString(
            'en-AU',
            {
              timeZone: 'Australia/Sydney',
            },
          )})`,
      ),
    ]
    const UserAttendances = attendanceData.map((user) => [
      user.name,
      user.instrument,
      ...user.attendanceByEvent.map(String),
    ])

    return [headers, ...UserAttendances]
      .map((user) =>
        user.map((value) => `"${value.replaceAll('"', '""')}"`).join(','),
      )
      .join('\n')
  }, [attendanceData, eventsInRange])

  // Page content starts here.
  const validDateRange =
    startDate !== '' && endDate !== '' && startDate <= endDate
  const hasSelectedRange = selectedRange !== null
  const hasEventsInRange = eventsInRange.length > 0
  const hasAttendees = attendanceData.length > 0
  const canDownload = hasSelectedRange && hasEventsInRange && hasAttendees

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <Heading
        as="h1"
        variant="primary"
        className="mx-auto w-full max-w-screen-sm"
      >
        Attendance Tracker
      </Heading>

      <div className="mx-auto grid w-full max-w-screen-sm grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField
          label="Start date"
          value={startDate}
          onChange={setStartDate}
        />
        <DateField label="End date" value={endDate} onChange={setEndDate} />
      </div>

      <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-2 sm:flex-row">
        <Button
          variant="primary"
          disabled={!validDateRange}
          className="flex-1"
          onClick={() => {
            if (!validDateRange) {
              return
            }
            setDateRange({ startDate, endDate })
          }}
        >
          Update Attendance
        </Button>

        <Button
          variant="secondary"
          disabled={!canDownload}
          className="flex-1"
          asChild
        >
          <a
            href="#"
            download="attendance_tracker.csv"
            aria-disabled={!canDownload}
            onClick={(event) => {
              event.preventDefault()

              if (!canDownload) {
                return
              }

              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
              const url = URL.createObjectURL(blob)
              const anchor = globalThis.document.createElement('a')
              anchor.href = url
              anchor.download = 'attendance_tracker.csv'
              anchor.click()
              URL.revokeObjectURL(url)
            }}
          >
            Download Attendance
          </a>
        </Button>
      </div>

      {hasSelectedRange && !hasEventsInRange ? (
        <p className="mx-auto w-full max-w-screen-sm">
          No events found in the selected date range.
        </p>
      ) : null}

      {hasSelectedRange && hasEventsInRange && !hasAttendees ? (
        <p className="mx-auto w-full max-w-screen-sm">
          No attendees for events in selected range.
        </p>
      ) : null}

      {hasAttendees ? (
        <section className="mx-auto flex w-full max-w-screen-sm flex-col gap-3">
          <Heading as="h2" variant="secondary">
            Attendees
          </Heading>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {attendanceData.map((user) => (
              <div
                key={user.userId}
                className="relative flex h-10 items-center justify-center rounded-full border px-5 font-semibold"
              >
                <span className="line-clamp-1">{user.name}</span>
                <div
                  className="absolute -top-1 -right-1 z-10 rounded-full border px-1 font-mono text-xs leading-tight"
                  style={{
                    color: `oklch(0.9 0.15 ${user.attendanceRate * 1.2 + 30})`,
                    backgroundColor: `oklch(0.6 0.15 ${user.attendanceRate * 1.2 + 30})`,
                  }}
                >
                  {user.attendanceRate}%
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

// Export page
export const AttendanceTrackerPage = () => {
  const {
    data: events,
    error: eventsError,
    isPending: isEventsPending,
  } = useQuery(queries.EVENTS())
  const {
    data: users,
    error: usersError,
    isPending: isUsersPending,
  } = useQuery(queries.USERS())
  const {
    data: instruments,
    error: instrumentsError,
    isPending: isInstrumentsPending,
  } = useQuery(queries.INSTRUMENTS())

  if (eventsError || usersError || instrumentsError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{(eventsError || usersError || instrumentsError)?.message}</p>
      </main>
    )
  }

  if (isEventsPending || isUsersPending || isInstrumentsPending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <AttendanceTrackerContent
      events={events}
      users={users}
      instruments={instruments}
    />
  )
}
