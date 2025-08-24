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
  const { mutate: updateEvent } = useMutation(
    mutations.EVENT(queryClient, event.id),
  )

  const attended = user.events.includes(event.id)

  return (
    <Button
      variant={attended ? 'success' : 'secondary'}
      onClick={() => {
        updateEvent({
          attendees: attended
            ? event.attendees.filter((id) => id !== user.id)
            : [...event.attendees, user.id],
        })
      }}
    >
      {event.name}
    </Button>
  )
}
