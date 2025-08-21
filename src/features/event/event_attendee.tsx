import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'
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
    <div className="bg-neutral-5/80 border-neutral-4/80 flex h-16 flex-row items-center rounded-full border pr-4 pl-8 backdrop-blur">
      <p className="flex flex-1 flex-row items-center gap-4 font-bold">
        <span className="text-neutral-2">{getProfileScreenName(profile)}</span>

        {profile.instruments.length > 0 && (
          <span className="text-neutral-3">
            {profile.instruments.slice(0, 3).join(', ')}
          </span>
        )}
      </p>

      {eventAttendees.some((attendee) => attendee === profile.user_id) ? (
        <div className="px-6">
          <CheckIcon className="stroke-positive-3 -m-1 size-6 stroke-2" />
        </div>
      ) : (
        <Button
          variant="secondary"
          onClick={() => {
            updateAttendance(profile.user_id)
          }}
        >
          <PlusIcon className="-m-1 size-6" />
        </Button>
      )}
    </div>
  )
}
