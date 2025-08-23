'use client'

import { PencilIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { ProfileEventsAttended } from '@/features/profile/profile_events_attended'
import { ProfileInstruments } from '@/features/profile/profile_instruments'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'

import { getUserDisplayName } from '../../features/profile/get_user_display_name'
import { ProfileDTO } from '../dtos/profile_dto_validator'

export const ProfilePage = ({ user_id }: Pick<ProfileDTO, 'user_id'>) => {
  const {
    data: profile,
    error: profileError,
    isPending: isProfilePending,
  } = useQuery(queries.PROFILE(user_id))
  const { data: session } = useQuery(queries.SESSION())
  useQuery(queries.INSTRUMENTS())
  useQuery(queries.EVENTS())

  if (isProfilePending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (profileError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{profileError.message}</p>
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="prose">
        <h1>Profile Not Found</h1>
        <p>The profile you are looking for does not exist.</p>
      </main>
    )
  }

  return (
    <main className="prose">
      <h1>{getUserDisplayName(profile)}</h1>

      <ProfileInstruments profile={profile} />

      <ProfileEventsAttended user_id={profile.user_id} />

      {session && session.user_id === profile.user_id && (
        <Button variant="primary" asChild>
          <Link href={routes.PROFILE_EDIT(profile.user_id)}>
            <PencilIcon className="h-5 w-5" />
            Edit
          </Link>
        </Button>
      )}
    </main>
  )
}
