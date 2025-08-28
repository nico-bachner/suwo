'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Section } from '@/design_system/section'
import { Heading } from '@/design_system/typography'
import { getUpcomingEvents } from '@/features/event/get_upcoming_events'
import { MarkSelfAsPresent } from '@/features/event/mark_self_as_present'
import { useCurrentEvent } from '@/features/event/use_upcoming_event'
import { cn } from '@/utils/cn'

import { UserDTO } from '../dtos/user_dto_validator'
import { queries } from '../queries'
import { routes } from '../routes'

export const UserHomePage = ({ id }: Pick<UserDTO, 'id'>) => {
  const { data: user } = useQuery(queries.USER(id))
  const { data: events } = useSuspenseQuery(queries.EVENTS())
  const currentEvent = useCurrentEvent()

  return (
    <main
      className={cn('mx-auto w-full max-w-screen-sm', 'flex flex-col gap-8')}
    >
      {user && (
        <Section className="flex flex-col gap-4">
          <Heading as="h1" variant="tertiary">
            Welcome back, {user.given_name}!
          </Heading>

          <p>
            Here you can find information about upcoming events and manage your
            attendance.
          </p>
        </Section>
      )}

      {currentEvent && (
        <Section className="flex flex-col gap-4">
          <Heading as="h2" variant="tertiary">
            {currentEvent.name}
          </Heading>

          <p>
            If you are attending this event, please mark yourself as present so
            that we can keep track of attendance.
          </p>

          <MarkSelfAsPresent user_id={id} event={currentEvent} />
        </Section>
      )}

      <Section className="flex flex-col gap-4">
        <Heading as="h2" variant="tertiary">
          Upcoming Events
        </Heading>

        {getUpcomingEvents(events)
          .slice(0, 3)
          .map((event) => (
            <Link
              key={event.id}
              href={routes.EVENT(event.id)}
              className="text-primary-2 underline"
            >
              {event.name} – {event.location}
            </Link>
          ))}
      </Section>
    </main>
  )
}
