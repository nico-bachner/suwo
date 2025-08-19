import Link from 'next/link'

import { SkeletonText } from '@/design_system/skeleton'
import { Profile } from '@/lib/validators/profile_validator'
import { routes } from '@/routes'

import { getProfileScreenName } from './get_profile_screen_name'

export const ProfilePreview = (profile: Profile) => (
  <Link
    key={profile.user_id}
    href={routes.PROFILE(profile.user_id)}
    className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 font-bold backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105"
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
  <div className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 font-bold backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105">
    <SkeletonText className="h-7" />
    <SkeletonText className="h-5" />
  </div>
)
