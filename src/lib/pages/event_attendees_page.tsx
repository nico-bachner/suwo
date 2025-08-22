'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/design_system/button'
import { SearchInput } from '@/design_system/input'
import { Heading } from '@/design_system/typography'
import { EventAttendee } from '@/features/event/event_attendee'
import { MarkSelfAsPresent } from '@/features/event/mark_self_as_present'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { search } from '@/utils/search'

import { Event } from '../validators/event_validator'

export const EventAttendeesPage = ({ id }: Pick<Event, 'id'>) => {
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())
  const {
    data: event,
    error: eventError,
    isPending: isEventPending,
  } = useQuery(queries.EVENT(id))
  const {
    data: profiles,
    error: profilesError,
    isPending: isProfilesPending,
  } = useQuery(queries.PROFILES())
  const {
    data: eventAttendees,
    error: eventAttendeesError,
    isPending: isEventAttendeesPending,
  } = useQuery(queries.EVENT_ATTENDEES(id))
  const [query, setQuery] = useState('')

  if (sessionError || eventError || profilesError || eventAttendeesError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>
          {
            (sessionError || eventError || profilesError || eventAttendeesError)
              ?.message
          }
        </p>
      </main>
    )
  }

  if (
    isSessionPending ||
    isEventPending ||
    isProfilesPending ||
    isEventAttendeesPending
  ) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
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
    <main className="mx-auto flex w-full max-w-screen-lg flex-col gap-8">
      <Heading
        as="h1"
        variant="primary"
        className="mx-auto w-full max-w-screen-sm"
      >
        {event.name} Attendees
      </Heading>

      <p className="mx-auto w-full max-w-screen-sm text-xl">
        Present: {`${eventAttendees.length}/${profiles.length}`}
      </p>

      {session ? (
        <MarkSelfAsPresent
          eventId={event.id}
          className="mx-auto w-full max-w-screen-sm"
        />
      ) : (
        <Button
          variant="primary"
          className="mx-auto w-full max-w-screen-sm"
          asChild
        >
          <Link href={routes.LOGIN()}>Login to auto-mark attendance</Link>
        </Button>
      )}

      <SearchInput
        value={query}
        onChange={({ target }) => {
          setQuery(target.value)
        }}
        placeholder="Search by first or last name"
        className="mx-auto w-full max-w-screen-sm"
      />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {search({
          data: profiles,
          keys: ['given_name', 'family_name'],
          query,
        }).map((profile) => (
          <EventAttendee
            key={profile.user_id}
            eventId={event.id}
            profile={profile}
          />
        ))}
      </div>
    </main>
  )
}
