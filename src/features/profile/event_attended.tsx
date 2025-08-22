import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { mutations } from '@/lib/mutations'
import { Event } from '@/lib/validators/event_validator'
import { Profile } from '@/lib/validators/profile_validator'

type EventAttendedProps = {
  event: Event
  profile: Profile
}

export const EventAttended = ({ event, profile }: EventAttendedProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateAttendance } = useMutation(
    mutations.EVENT_ATTENDEES(queryClient, event.id),
  )

  return (
    <Button
      variant={profile.events.includes(event.id) ? 'success' : 'secondary'}
      onClick={() => {
        updateAttendance(profile.user_id)
      }}
    >
      {event.name}
    </Button>
  )
}
