'use client'

import { PencilIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
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
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (error) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{error.message}</p>
      </main>
    )
  }

  return (
    <main className="prose">
      <h1>{getProfileScreenName(profile)}</h1>

      {profile.roles.length > 0 && <p>{profile.roles.join(', ')}</p>}

      {profile.instruments.length > 0 && (
        <p>{profile.instruments.join(', ')}</p>
      )}

      {session && session.user_id === profile.user_id && (
        <Button variant="primary" asChild>
          <Link
            href={routes.EDIT_PROFILE(profile)}
            className="flex cursor-pointer flex-row items-center rounded-full bg-amber-700 px-4 py-2 transition-colors select-none hover:bg-amber-800 focus:bg-amber-900 focus:outline-none"
          >
            <PencilIcon className="stroke-neutral-2 h-5 w-5" />

            <span className="text-neutral-2 px-2 font-medium">Edit</span>
          </Link>
        </Button>
      )}
    </main>
  )
}
