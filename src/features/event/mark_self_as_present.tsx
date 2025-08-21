import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { mutations } from '@/lib/mutations'
import { queries } from '@/lib/queries'

type MarkSelfAsPresentProps = {
  eventId: string
  className?: string
}

export const MarkSelfAsPresent = ({
  eventId,
  className,
}: MarkSelfAsPresentProps) => {
  const queryClient = useQueryClient()
  const { data: eventAttendees } = useQuery(queries.EVENT_ATTENDEES(eventId))
  const { data: session } = useQuery(queries.SESSION())
  const { mutate: updateAttendance } = useMutation(
    mutations.EVENT_ATTENDEES(queryClient, eventId),
  )

  if (!session || !eventAttendees) {
    return null
  }

  const isPresent = eventAttendees.some(
    (attendee) => attendee === session.user_id,
  )

  if (isPresent) {
    return (
      <Button variant="primary" disabled className={className}>
        Marked as present
      </Button>
    )
  }

  return (
    <Button
      variant="primary"
      className={className}
      onClick={() => {
        updateAttendance(session.user_id)
      }}
    >
      Mark self as present
    </Button>
  )
}
