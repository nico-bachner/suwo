'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

import { queries, queryKeys } from '@/lib/queries'
import { routes } from '@/lib/routes'
import { formatDateRange } from '@/utils/format_date_range'

export const EventsPage = () => {
  const queryClient = useQueryClient()
  const {
    data: events,
    error: eventsError,
    isPending: isEventsPending,
  } = useQuery(queries.EVENTS())

  if (isEventsPending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (eventsError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{eventsError.message}</p>
      </main>
    )
  }

  if (events.length === 0) {
    return (
      <main className="prose">
        <h1>Events</h1>
        <p>There are currently no events scheduled.</p>
      </main>
    )
  }

  events.forEach((event) => {
    queryClient.setQueryData(queryKeys.EVENT(event.id), event)
  })

  return (
    <main className="prose">
      <h1>Events</h1>

      <h2>Upcoming Events</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events
          .filter((event) => new Date(event.starts_at).getTime() > Date.now())
          .map((event) => (
            <Link
              key={event.id}
              href={routes.EVENT(event.id)}
              className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105"
            >
              <h2 className="text-neutral-1 font-bold">{event.name}</h2>
              <p className="font-light">
                {formatDateRange(
                  new Date(event.starts_at),
                  event.ends_at ? new Date(event.ends_at) : undefined,
                )}
              </p>
              <p className="text-neutral-3 font-bold">
                {event.location || 'No location specified'}
              </p>
            </Link>
          ))}
      </div>

      <h2>Past Events</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events
          .filter((event) => new Date(event.starts_at).getTime() < Date.now())
          .map((event) => (
            <Link
              key={event.id}
              href={routes.EVENT(event.id)}
              className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105"
            >
              <h2 className="text-neutral-1 font-bold">{event.name}</h2>
              <p className="font-light">
                {formatDateRange(
                  new Date(event.starts_at),
                  event.ends_at ? new Date(event.ends_at) : undefined,
                )}
              </p>
              <p className="text-neutral-3 font-bold">
                {event.location || 'No location specified'}
              </p>
            </Link>
          ))}
      </div>
    </main>
  )
}
