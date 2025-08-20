'use client'

import { SkeletonText } from '@/design_system/skeleton'
import { Profile } from '@/lib/validators/profile_validator'

import { getProfileScreenName } from '../profile/get_profile_screen_name'
import {
  EventAttendeeStatus,
  EventAttendeeStatusSkeleton,
} from './event_attendee_status'

type EventAttendeeProps = {
  profile: Profile
  status: boolean
}

export const EventAttendee = ({ profile, status }: EventAttendeeProps) => (
  <div className="bg-neutral-5/80 border-neutral-4/80 flex h-16 flex-row items-center rounded-full border pr-4 pl-8 backdrop-blur">
    <p className="flex flex-1 flex-row items-center gap-4 font-bold">
      <span className="text-neutral-2">{getProfileScreenName(profile)}</span>

      {profile.instruments.length > 0 && (
        <span className="text-neutral-3">
          {profile.instruments.slice(0, 3).join(', ')}
        </span>
      )}
    </p>

    <EventAttendeeStatus status={status} />
  </div>
)

export const EventAttendeeSkeleton = () => (
  <div className="bg-neutral-5/80 border-neutral-4/80 flex h-16 flex-row items-center rounded-full border pr-4 pl-8 backdrop-blur">
    <div className="flex flex-1 flex-row gap-2 px-4">
      <SkeletonText className="h-5 w-20" />
      <SkeletonText className="h-5 w-10" />
    </div>

    <EventAttendeeStatusSkeleton />
  </div>
)
