'use client'

import { useQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'

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
    <main className="prose">
      <h1>{event.name}</h1>
      <div>{}</div>
    </main>
  )
}
