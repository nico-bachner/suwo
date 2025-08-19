'use client'

import { useQuery } from '@tanstack/react-query'

import { EventNavigator } from '@/features/event/event_navigator'
import { queries } from '@/lib/queries'
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
    <main>
      <EventNavigator
        id={event.id}
        className="fixed right-2 bottom-20 left-2 z-30 md:bottom-4"
      />

      <h1>{event.name}</h1>

      <p>
        {formatDateRange(
          new Date(event.starts_at),
          event.ends_at ? new Date(event.ends_at) : undefined,
        )}
      </p>
    </main>
  )
}
