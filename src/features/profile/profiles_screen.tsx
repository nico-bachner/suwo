import Link from 'next/link'

import { ProfilesScreenProps } from './types'
import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfilesScreen = ({ profiles }: ProfilesScreenProps) => (
  <div className="prose mx-auto max-w-screen-sm px-4 py-8">
    <h1>Members</h1>

    {profiles.map((profile) => (
      <Link
        key={profile.handle}
        href={`/members/${profile.handle}`}
        className="flex flex-col rounded-lg bg-gray-900 px-4 py-2 font-bold"
      >
        <span className="text-gray-300">{getProfileScreenName(profile)}</span>
        <span className="text-gray-500">{profile.instrument_name}</span>
      </Link>
    ))}
  </div>
)
