import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { EventDTO } from '@/lib/dtos/event_dto_validator'
import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { mutations } from '@/lib/mutations'

import { getUserDisplayName } from '../user/get_user_display_name'

type EventAttendeeProps = {
  event: EventDTO
  user: UserDTO
}

export const EventAttendee = ({ event, user }: EventAttendeeProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useMutation(
    mutations.USER(queryClient, user.id),
  )

  return (
    <Button
      variant={user.events.includes(event.id) ? 'success' : 'secondary'}
      onClick={() => {
        updateUser({
          events: user.events.includes(event.id)
            ? user.events.filter((id) => id !== event.id)
            : [...user.events, event.id],
        })
      }}
    >
      {getUserDisplayName(user)}

      <div
        className="absolute -top-1 -right-1 z-10 rounded-full border px-1 font-mono text-xs leading-tight"
        style={{
          color: `oklch(0.9 0.15 ${user.attendance_rate * 1.2 + 30})`,
          backgroundColor: `oklch(0.6 0.15 ${user.attendance_rate * 1.2 + 30})`,
        }}
      >
        {user.attendance_rate}%
      </div>
    </Button>
  )
}
