'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { formatDateRange } from '@/utils/format_date_range'

import { Event } from '../validators/event_validator'

export const EventPage = ({ id }: Pick<Event, 'id'>) => {
  const {
    data: event,
    error: eventError,
    isPending: isEventPending,
  } = useQuery(queries.EVENT(id))

  if (isEventPending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (eventError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{eventError.message}</p>
      </main>
    )
  }

  if (!event) {
    return (
      <main className="prose">
        <h1>Event</h1>
        <p>No event found with the provided ID.</p>
      </main>
    )
  }

  return (
    <main className="prose mx-auto max-w-screen-sm">
      <h1>{event.name}</h1>

      <p>
        {formatDateRange(
          new Date(event.starts_at),
          event.ends_at ? new Date(event.ends_at) : undefined,
        )}
        {event.location && ` at ${event.location}`}
      </p>

      <div className="flex items-center gap-2">
        <Button variant="primary" asChild className="flex-1">
          <Link href={routes.EVENTS()}>Back to Events</Link>
        </Button>

        <Button variant="primary" asChild className="flex-1">
          <Link href={routes.EVENT_ATTENDEES(id)}>Attendance Sheet</Link>
        </Button>
      </div>
    </main>
  )
}
