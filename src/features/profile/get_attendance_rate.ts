import { Event } from '@/lib/validators/event_validator'
import { ProfileDTO } from '@/lib/validators/profile_dto_validator'

export const getAttendanceRate = (
  events: Pick<Event, 'id' | 'starts_at'>[],
  profileEvents: ProfileDTO['events'],
  profileCreatedAt: ProfileDTO['created_at'],
) => {
  const pastEventsSinceAccountCreation = events.filter((event) => {
    const eventDate = new Date(event.starts_at).getTime()
    const accountCreationDate = new Date(profileCreatedAt).getTime()
    const now = Date.now()

    return eventDate > accountCreationDate && eventDate < now
  })

  if (pastEventsSinceAccountCreation.length === 0) {
    return 0
  }

  const eventsAttendedSinceAccountCreation =
    pastEventsSinceAccountCreation.filter((event) =>
      profileEvents.includes(event.id),
    )

  const ratio =
    eventsAttendedSinceAccountCreation.length /
    pastEventsSinceAccountCreation.length

  return Math.round(ratio * 100)
}
