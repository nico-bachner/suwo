'use client'

import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/design_system/button'
import { SearchInput } from '@/design_system/input'
import { Heading } from '@/design_system/typography'
import { getProfileScreenName } from '@/features/profile/get_profile_screen_name'
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
          <div
            key={profile.user_id}
            className="bg-neutral-5/80 border-neutral-4/80 flex h-16 flex-row items-center rounded-full border pr-4 pl-8 backdrop-blur"
          >
            <p className="flex flex-1 flex-row items-center gap-4 font-bold">
              <span className="text-neutral-2">
                {getProfileScreenName(profile)}
              </span>

              {profile.instruments.length > 0 && (
                <span className="text-neutral-3">
                  {profile.instruments.slice(0, 3).join(', ')}
                </span>
              )}
            </p>

            {eventAttendees.some((attendee) => attendee === profile.user_id) ? (
              <div className="px-6">
                <CheckIcon className="stroke-positive-3 -m-1 size-6 stroke-2" />
              </div>
            ) : (
              <Button variant="secondary">
                <PlusIcon className="-m-1 size-6" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
