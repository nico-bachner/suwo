'use client'

import { PencilIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { PageContainer } from '@/design_system/container'
import { Profile } from '@/generated/prisma'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfileScreen = ({ user_id }: Pick<Profile, 'user_id'>) => {
  const { data: session } = useQuery(queries.SESSION())
  const {
    data: profile,
    error,
    isPending,
  } = useQuery(queries.PROFILE({ user_id }))

  if (isPending) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Loading...</h1>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Error</h1>
        <p>Failed to load profile: {error.message}</p>
      </PageContainer>
    )
  }

  return (
    <PageContainer size="sm" className="prose">
      <h1>{getProfileScreenName(profile)}</h1>

      {profile.role_names.length > 0 && (
        <p className="text-sm text-neutral-500">
          {profile.role_names.join(', ')}
        </p>
      )}

      {profile.instrument_name && <p>{profile.instrument_name}</p>}

      {session && session.user_id === profile.user_id && (
        <Link
          href={routes.EDIT_PROFILE(profile)}
          className="flex cursor-pointer flex-row items-center rounded-full bg-amber-700 px-4 py-2 transition-colors select-none hover:bg-amber-800 focus:bg-amber-900 focus:outline-none"
        >
          <PencilIcon className="stroke-neutral-2 h-5 w-5" />

          <span className="text-neutral-2 px-2 font-medium">Edit</span>
        </Link>
      )}
    </PageContainer>
  )
}
