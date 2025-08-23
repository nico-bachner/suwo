import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { ProfileDTO } from '@/lib/dtos/profile_dto_validator'
import { mutations } from '@/lib/mutations'
import { queries } from '@/lib/queries'

import { getUserDisplayName } from '../profile/get_user_display_name'

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
      {getUserDisplayName(profile)}

      <div
        className="absolute -top-1 -right-1 z-10 rounded-full border px-1 text-sm leading-tight tabular-nums"
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
