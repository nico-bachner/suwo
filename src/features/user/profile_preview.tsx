import Link from 'next/link'

import { SkeletonText } from '@/design_system/skeleton'
import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { routes } from '@/routes'

import { getUserDisplayName } from '../user/get_user_display_name'
import { UserInstruments } from '../user/user_instruments'

export const ProfilePreview = (user: UserDTO) => (
  <Link
    key={user.id}
    href={routes.PROFILE(user.id)}
    className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 font-bold backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105"
  >
    <p className="text-neutral-2">{getUserDisplayName(user)}</p>
    <UserInstruments user={user} className="text-neutral-3 line-clamp-1" />
  </Link>
)

export const ProfilePreviewSkeleton = () => (
  <div className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 font-bold backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105">
    <SkeletonText className="h-7" />
    <SkeletonText className="h-5" />
  </div>
)
