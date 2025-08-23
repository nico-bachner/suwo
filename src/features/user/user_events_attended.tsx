import { useQuery } from '@tanstack/react-query'

import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { queries } from '@/lib/queries'

import { ProfileEventAttended } from '../profile/profile_event_attended'

export const UserEventsAttended = ({ id }: Pick<UserDTO, 'id'>) => {
  const { data: events } = useQuery(queries.EVENTS())
  const { data: profile } = useQuery(queries.PROFILE(id))

  if (!profile || !events) {
    return null
  }

  return (
    <div className="prose">
      <h2>Events Attended</h2>

      <p>{profile.attendance_rate}% attendance rate</p>

      <div className="flex flex-wrap gap-2">
        {events
          .filter((event) => new Date(event.starts_at).getTime() < Date.now())
          .map((event) => (
            <ProfileEventAttended
              key={event.id}
              event={event}
              profile={profile}
            />
          ))}
      </div>
    </div>
  )
}
