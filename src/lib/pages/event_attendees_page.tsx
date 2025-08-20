'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { SearchInput } from '@/design_system/input'
import { EventAttendee } from '@/features/event/event_attendee'
import { queries } from '@/lib/queries'
import { search } from '@/utils/search'

import { Event } from '../validators/event_validator'

export const EventAttendeesPage = ({ id }: Pick<Event, 'id'>) => {
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

  if (eventError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{eventError.message}</p>
      </main>
    )
  }

  if (profilesError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{profilesError.message}</p>
      </main>
    )
  }

  if (eventAttendeesError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{eventAttendeesError.message}</p>
      </main>
    )
  }

  if (isEventPending || isProfilesPending || isEventAttendeesPending) {
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
    <main className="prose">
      <h1>{event.name} Attendees</h1>

      <p className="text-xl">
        Present: {`${eventAttendees.length}/${profiles.length}`}
      </p>

      <SearchInput
        value={query}
        onChange={({ target }) => {
          setQuery(target.value)
        }}
        placeholder="Search by name or instrument"
      />

      <div className="mx-auto flex w-full max-w-screen-md flex-col gap-2">
        {search({
          data: profiles,
          keys: ['given_name', 'family_name', 'instrument_name'],
          query,
        }).map((profile) => (
          <EventAttendee
            key={profile.user_id}
            profile={profile}
            status={eventAttendees.some(
              (attendee) => attendee.user_id === profile.user_id,
            )}
          />
        ))}
      </div>
    </main>
  )
}
