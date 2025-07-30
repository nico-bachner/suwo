import Link from 'next/link'

import { SkeletonText } from '@/design_system/skeleton'
import { ProfileQueryResult } from '@/lib/queries/profile_query'
import { routes } from '@/routes'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfilePreview = (profile: ProfileQueryResult) => (
  <Link
    key={profile.user_id}
    href={routes.PROFILE(profile)}
    className="bg-neutral-6 flex flex-col rounded-lg px-6 py-4 font-bold"
  >
    <span className="text-neutral-2">{getProfileScreenName(profile)}</span>
    <span className="text-neutral-3 line-clamp-1">
      {profile.instruments.length > 0
        ? profile.instruments.join(', ')
        : 'Non-playing member'}
    </span>
  </Link>
)

export const ProfilePreviewSkeleton = () => (
  <div className="bg-neutral-6 flex flex-col rounded-lg px-6 py-4">
    <SkeletonText className="h-7" />
    <SkeletonText className="h-5" />
  </div>
)
