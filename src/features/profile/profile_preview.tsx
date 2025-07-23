import Link from 'next/link'

import { SkeletonText } from '@/design_system/skeleton'
import { Profile } from '@/generated/prisma'
import { routes } from '@/routes'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfilePreview = (profile: Profile) => (
  <Link
    key={profile.handle}
    href={routes.PROFILE(profile)}
    className="bg-neutral-6 flex flex-col gap-2 rounded-lg px-4 py-2 font-bold"
  >
    <span className="text-neutral-2 text-lg">
      {getProfileScreenName(profile)}
    </span>
    <span className="text-neutral-3">{profile.instrument_name}</span>
  </Link>
)

export const ProfilePreviewSkeleton = () => (
  <div className="bg-neutral-6 flex flex-col gap-2 rounded-lg px-4 py-2">
    <SkeletonText className="h-7" />
    <SkeletonText className="h-5" />
  </div>
)
