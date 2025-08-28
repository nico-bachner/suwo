'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Section } from '@/design_system/section'
import { Heading } from '@/design_system/typography'
import { cn } from '@/utils/cn'

import { UserDTO } from '../dtos/user_dto_validator'
import { queries } from '../queries'
import { routes } from '../routes'

export const UserHomePage = ({ id }: Pick<UserDTO, 'id'>) => {
  const {
    data: user,
    error: userError,
    isPending: isUserPending,
  } = useQuery(queries.USER(id))
  const { data: events } = useSuspenseQuery(queries.EVENTS())

  if (isUserPending) {
    return (
      <main className="prose">
        <h1>Loading user data...</h1>
      </main>
    )
  }

  if (userError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>An error occurred while fetching user data: {userError.message}</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="prose">
        <h1>User not found</h1>
        <p>Please log in again.</p>
      </main>
    )
  }

  return (
    <main
      className={cn('mx-auto w-full max-w-screen-sm', 'flex flex-col gap-8')}
    >
      <Section className="flex flex-col gap-4">
        <Heading as="h2" variant="secondary">
          Upcoming Events
        </Heading>

        {events
          .filter((event) => {
            if (event.ends_at) {
              return new Date(event.ends_at) >= new Date()
            }

            return new Date(event.starts_at) >= new Date()
          })
          .slice(0, 3)
          .map((event) => (
            <Link
              key={event.id}
              href={routes.EVENT(id)}
              className="text-primary-2 underline"
            >
              {event.name} – {event.location}
            </Link>
          ))}
      </Section>
    </main>
  )
}
