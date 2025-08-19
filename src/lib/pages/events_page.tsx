'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { queries } from '@/lib/queries'
import { routes } from '@/routes'

export const EventsPage = () => {
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

  return (
    <main className="prose">
      <h1>Events</h1>
      <div>
        {events.map((item) => (
          <Link key={item.id} href={routes.EVENT(item.id)}>
            <p>{item.name}</p>
            <p>
              {new Intl.DateTimeFormat('en-AU', {
                timeZone: 'Australia/Sydney',
                dateStyle: 'full',
                timeStyle: 'long',
              }).format(new Date(item.starts_at))}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
