import { useQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'
import { EventAttendee } from '@/lib/validators/event_attendee_validator'

export const useAttendanceRate = (userId: EventAttendee['user_id']) => {
  const { data: events } = useQuery(queries.EVENTS())
  const { data: profile } = useQuery(queries.PROFILE(userId))

  if (!events || !profile) {
    return 0
  }

  return Math.round((profile.events.length / events.length) * 100)
}
