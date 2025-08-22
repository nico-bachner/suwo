import { useQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'
import { EventAttendee } from '@/lib/validators/event_attendee_validator'

export const useAttendanceRate = (userId: EventAttendee['user_id']) => {
  const { data: events } = useQuery(queries.EVENTS())
  const { data: profile } = useQuery(queries.PROFILE(userId))

  if (!events || !profile) {
    return 0
  }

  const pastEventsSinceAccountCreation = events.filter((event) => {
    const eventDate = new Date(event.starts_at).getTime()
    const accountCreationDate = new Date(profile.created_at).getTime()
    const now = Date.now()

    return eventDate > accountCreationDate && eventDate < now
  })

  const eventsAttendedSinceAccountCreation =
    pastEventsSinceAccountCreation.filter((event) =>
      profile.events.includes(event.id),
    )

  const ratio =
    eventsAttendedSinceAccountCreation.length /
    pastEventsSinceAccountCreation.length

  return Math.round(ratio * 100) // Convert to percentage
}
