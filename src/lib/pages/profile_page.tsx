'use client'

import { PencilIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { getUserDisplayName } from '@/features/user/get_user_display_name'
import { UserEventsAttended } from '@/features/user/user_events_attended'
import { UserInstruments } from '@/features/user/user_instruments'
import { queries } from '@/lib/queries'
import { routes } from '@/lib/routes'

import { UserDTO } from '../dtos/user_dto_validator'

export const ProfilePage = ({ id }: Pick<UserDTO, 'id'>) => {
  const {
    data: user,
    error: userError,
    isPending: isUserPending,
  } = useQuery(queries.USER(id))
  const { data: session } = useQuery(queries.SESSION())

  if (isUserPending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (userError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{userError.message}</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="prose">
        <h1>User Not Found</h1>
        <p>The user you are looking for does not exist.</p>
      </main>
    )
  }

  return (
    <main className="prose">
      <h1>{getUserDisplayName(user)}</h1>

      <UserInstruments user={user} />

      <UserEventsAttended {...user} />

      {session && session.user_id === user.id && (
        <Button variant="primary" asChild>
          <Link href={routes.PROFILE_EDIT(user.id)}>
            <PencilIcon className="h-5 w-5" />
            Edit
          </Link>
        </Button>
      )}
    </main>
  )
}
