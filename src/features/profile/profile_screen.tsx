import { PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { ProfileScreenProps } from './types'
import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfileScreen = ({ profile, session }: ProfileScreenProps) => (
  <div className="prose mx-auto max-w-screen-sm px-4 py-8">
    <h1>{getProfileScreenName(profile)}</h1>

    {profile.instrument_name && <p>{profile.instrument_name}</p>}

    {session.id === profile.user_id && (
      <Link
        href={`/members/${profile.handle}/edit`}
        className="flex cursor-pointer flex-row items-center rounded-full bg-amber-700 px-4 py-2 transition-colors select-none hover:bg-amber-800 focus:bg-amber-900 focus:outline-none"
      >
        <PencilIcon className="h-5 w-5 stroke-gray-300" />

        <span className="px-2 font-medium text-gray-300">Edit</span>
      </Link>
    )}
  </div>
)
