'use client'

import { PencilIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { Profile } from '@/generated/prisma'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'

import { getProfileScreenName } from './utils/get_profile_screen_name'
import { useProfileAttendanceRate } from './utils/use_profile_attendance_rate'

export const ProfileScreen = ({ user_id }: Pick<Profile, 'user_id'>) => {
  const {
    data: profile,
    error: profileError,
    isPending: isProfilePending,
  } = useQuery(queries.PROFILE({ user_id }))
  const { data: session } = useQuery(queries.SESSION())
  const attendanceRate = useProfileAttendanceRate(profile?.attendances)

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
      <h1>{getProfileScreenName(profile)}</h1>

      {profile.roles.length > 0 && <p>{profile.roles.join(', ')}</p>}

      {profile.instruments.length > 0 && (
        <p>{profile.instruments.join(', ')}</p>
      )}

      <p>{attendanceRate}% attendance</p>

      {session && session.user_id === profile.user_id && (
        <Button variant="primary" asChild>
          <Link href={routes.EDIT_PROFILE(profile.user_id)}>
            <PencilIcon className="h-5 w-5" />
            Edit
          </Link>
        </Button>
      )}
    </main>
  )
}
