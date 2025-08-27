import { useSuspenseQuery } from '@tanstack/react-query'

import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { queries } from '@/lib/queries'

import { UserEventAttended } from './user_event_attended'

export const UserEventsAttended = (user: UserDTO) => {
  const { data: events } = useSuspenseQuery(queries.EVENTS())

  return (
    <div className="prose">
      <h2>Events Attended</h2>

      <p>{user.attendance_rate}% attendance rate</p>

      <div className="flex flex-wrap gap-2">
        {events
          .filter((event) => new Date(event.starts_at).getTime() < Date.now())
          .map((event) => (
            <UserEventAttended key={event.id} event={event} user={user} />
          ))}
      </div>
    </div>
  )
}
