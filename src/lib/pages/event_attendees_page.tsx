'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/design_system/button'
import { SearchInput } from '@/design_system/input'
import { Heading } from '@/design_system/typography'
import { EventAttendee } from '@/features/event/event_attendee'
import { queries } from '@/lib/queries'
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
    <main className="mx-auto flex w-full max-w-screen-md flex-col gap-8">
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

      {session && (
        <Button variant="primary" className="mx-auto w-full max-w-screen-sm">
          Mark self as present
        </Button>
      )}

      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <SearchInput
          value={query}
          onChange={({ target }) => {
            setQuery(target.value)
          }}
          placeholder="Search by name or instrument"
          className="flex-grow"
        />
      </div>

      <div className="mx-auto flex w-full max-w-screen-md flex-col gap-2">
        {search({
          data: profiles,
          keys: ['given_name', 'family_name', 'instrument_name'],
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
