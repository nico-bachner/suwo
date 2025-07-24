import Link from 'next/link'

import { SkeletonText } from '@/design_system/skeleton'
import { Profile } from '@/generated/prisma'
import { routes } from '@/routes'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfilePreview = (profile: Profile) => (
  <Link
    key={profile.handle}
    href={routes.PROFILE(profile)}
    className="bg-neutral-6 flex flex-col rounded-lg px-6 py-4 font-bold"
  >
    <span className="text-neutral-2">{getProfileScreenName(profile)}</span>
    <span className="text-neutral-3">
      {profile.instrument_name ?? 'No Instrument'}
    </span>
  </Link>
)

export const ProfilePreviewSkeleton = () => (
  <div className="bg-neutral-6 flex flex-col rounded-lg px-6 py-4">
    <SkeletonText className="h-7" />
    <SkeletonText className="h-5" />
  </div>
)
