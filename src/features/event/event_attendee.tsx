import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { mutations } from '@/lib/mutations'
import { queries } from '@/lib/queries'
import { ProfileDTO } from '@/lib/validators/profile_dto_validator'

import { getProfileScreenName } from '../profile/get_profile_screen_name'

type EventAttendeeProps = {
  eventId: string
  profile: ProfileDTO
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

      <div
        className="absolute -top-1 -right-1 z-10 rounded-full border px-1.5 py-0.5 tabular-nums"
        style={{
          color: `oklch(0.9 0.15 ${profile.attendance_rate * 1.2 + 30})`,
          backgroundColor: `oklch(0.6 0.15 ${profile.attendance_rate * 1.2 + 30})`,
        }}
      >
        {profile.attendance_rate}%
      </div>
    </Button>
  )
}
