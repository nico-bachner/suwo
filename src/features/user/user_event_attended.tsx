import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { EventDTO } from '@/lib/dtos/event_dto_validator'
import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { mutations } from '@/lib/mutations'

type UserEventAttendedProps = {
  event: EventDTO
  user: UserDTO
}

export const UserEventAttended = ({ event, user }: UserEventAttendedProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useMutation(
    mutations.USER(queryClient, user.id),
  )

  const attended = user.events.includes(event.id)

  return (
    <Button
      variant={attended ? 'success' : 'secondary'}
      onClick={() => {
        updateUser({
          events: attended
            ? user.events.filter((id) => id !== event.id)
            : [...user.events, event.id],
        })
      }}
    >
      {event.name}
    </Button>
  )
}
