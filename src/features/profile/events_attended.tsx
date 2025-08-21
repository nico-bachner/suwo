import { useQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'
import { EventAttendee } from '@/lib/validators/event_attendee_validator'

import { EventAttended } from './event_attended'
import { useAttendanceRate } from './use_attendance_rate'

export const EventsAttended = ({ user_id }: Pick<EventAttendee, 'user_id'>) => {
  const { data: events } = useQuery(queries.EVENTS())
  const { data: profile } = useQuery(queries.PROFILE(user_id))
  const attendanceRate = useAttendanceRate(user_id)

  if (!profile || !events) {
    return null
  }

  return (
    <div className="prose">
      <h2>Events Attended</h2>

      <p>{attendanceRate}% attendance rate</p>

      <div className="flex flex-wrap gap-2">
        {events
          .filter((event) => new Date(event.starts_at).getTime() < Date.now())
          .map((event) => (
            <EventAttended key={event.id} event={event} profile={profile} />
          ))}
      </div>
    </div>
  )
}
