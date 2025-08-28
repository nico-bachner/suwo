import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { EventDTO } from '@/lib/dtos/event_dto_validator'
import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { mutations } from '@/lib/mutations'
import { queries } from '@/lib/queries'

type MarkSelfAsPresentProps = {
  user_id: UserDTO['id']
  event: EventDTO
  className?: string
}

export const MarkSelfAsPresent = ({
  user_id,
  event,
  className,
}: MarkSelfAsPresentProps) => {
  const queryClient = useQueryClient()
  const { data: user } = useQuery(queries.USER(user_id))
  const { mutate: updateUser } = useMutation(
    mutations.USER(queryClient, user_id),
  )

  if (!user) {
    return (
      <Button variant="secondary" className={className} disabled>
        Loading user...
      </Button>
    )
  }

  const isPresent = user.events.includes(event.id)

  return (
    <Button
      variant={isPresent ? 'success' : 'primary'}
      className={className}
      onClick={() => {
        updateUser({
          events: isPresent
            ? user.events.filter((id) => id !== event.id)
            : [...user.events, event.id],
        })
      }}
    >
      {isPresent ? 'Marked as present' : 'Mark self as present'}
    </Button>
  )
}
