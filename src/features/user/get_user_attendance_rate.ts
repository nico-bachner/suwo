import { Event, User } from '@/generated/prisma'

export const getUserAttendanceRate = (
  user: User & {
    events: Pick<Event, 'id'>[]
  },
  events: Event[],
) => {
  const pastEventsSinceAccountCreation = events.filter((event) => {
    const eventDate = new Date(event.starts_at).getTime()
    const accountCreationDate = new Date(user.created_at).getTime()
    const now = Date.now()

    return eventDate > accountCreationDate && eventDate < now
  })

  if (pastEventsSinceAccountCreation.length === 0) {
    return 100
  }

  const eventsAttendedSinceAccountCreation =
    pastEventsSinceAccountCreation.filter((event) =>
      user.events.some(({ id }) => id === event.id),
    )

  const ratio =
    eventsAttendedSinceAccountCreation.length /
    pastEventsSinceAccountCreation.length

  return Math.round(ratio * 100)
}
