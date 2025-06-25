import { PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { LINKS } from '@/config'

import { ProfileScreenProps } from './types'

export const ProfileScreen = ({ profile, session }: ProfileScreenProps) => (
  <PageLayout
    parent={{
      title: LINKS.MEMBERS.label,
      href: LINKS.MEMBERS.href,
    }}
    title={
      profile.display_name
        ? profile.display_name
        : profile.family_name
          ? `${profile.given_name} ${profile.family_name}`
          : profile.given_name
    }
    subtitle={profile.instrument_name ?? undefined}
    action={
      session.id === profile.user_id && (
        <Link
          href={`/members/${profile.handle}/edit`}
          className="flex cursor-pointer flex-row items-center rounded-full bg-amber-700 px-4 py-2 transition-colors select-none hover:bg-amber-800 focus:bg-amber-900 focus:outline-none"
        >
          <PencilIcon className="h-5 w-5 stroke-gray-300" />

          <span className="px-2 font-medium text-gray-300">Edit</span>
        </Link>
      )
    }
  />
)
