import { useQuery } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { queries } from '@/lib/queries'
import { EventAttendee } from '@/lib/validators/event_attendee_validator'
import { cn } from '@/utils/cn'

import { useAttendanceRate } from './use_attendance_rate'

export const EventsAttended = ({ user_id }: Pick<EventAttendee, 'user_id'>) => {
  const { data: events } = useQuery(queries.EVENTS())
  const { data: profile } = useQuery(queries.PROFILE(user_id))
  const attendanceRate = useAttendanceRate(user_id)

  if (!profile) {
    return null
  }

  if (!events) {
    return <p>Loading events...</p>
  }

  return (
    <div className="prose">
      <h2>Events Attended</h2>

      <p>{attendanceRate}% attendance rate</p>

      <div className="flex flex-wrap gap-2">
        {events
          .filter((event) => new Date(event.starts_at).getTime() < Date.now())
          .map((event) => (
            <Button
              key={event.id}
              variant="secondary"
              className={cn(profile.events.includes(event.id))}
            >
              {event.name}
            </Button>
          ))}
      </div>
    </div>
  )
}
