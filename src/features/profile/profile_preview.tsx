import Link from 'next/link'

import { SkeletonText } from '@/design_system/skeleton'
import { ProfileDTO } from '@/lib/validators/profile_dto_validator'
import { routes } from '@/routes'

import { getProfileScreenName } from './get_profile_screen_name'
import { ProfileInstruments } from './profile_instruments'

export const ProfilePreview = (profile: ProfileDTO) => (
  <Link
    key={profile.user_id}
    href={routes.PROFILE(profile.user_id)}
    className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 font-bold backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105"
  >
    <p className="text-neutral-2">{getProfileScreenName(profile)}</p>
    <ProfileInstruments
      profile={profile}
      className="text-neutral-3 line-clamp-1"
    />
  </Link>
)

export const ProfilePreviewSkeleton = () => (
  <div className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 font-bold backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105">
    <SkeletonText className="h-7" />
    <SkeletonText className="h-5" />
  </div>
)
