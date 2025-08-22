import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { mutations } from '@/lib/mutations'
import { queries } from '@/lib/queries'
import { Profile } from '@/lib/validators/profile_validator'

import { getProfileScreenName } from '../profile/get_profile_screen_name'

type EventAttendeeProps = {
  eventId: string
  profile: Profile
}

export const EventAttendee = ({ eventId, profile }: EventAttendeeProps) => {
  const queryClient = useQueryClient()
  const {
    data: eventAttendees,
    error,
    isPending,
  } = useQuery(queries.EVENT_ATTENDEES(eventId))
  const { mutate: updateAttendance } = useMutation(
    mutations.EVENT_ATTENDEES(queryClient, eventId),
  )

  if (error || isPending) {
    return null
  }

  return (
    <Button
      variant={
        eventAttendees.some((attendee) => attendee === profile.user_id)
          ? 'success'
          : 'secondary'
      }
      onClick={() => {
        updateAttendance(profile.user_id)
      }}
    >
      {getProfileScreenName(profile)}
    </Button>
  )
}
