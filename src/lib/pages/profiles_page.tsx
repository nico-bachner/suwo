'use client'

import { useQuery } from '@tanstack/react-query'

import {
  ProfilesScreen,
  ProfilesScreenSkeleton,
} from '@/features/user/profiles_screen'
import { queries } from '@/lib/queries'

export const ProfilesPage = () => {
  const {
    data: users,
    error: usersError,
    isPending: isUsersPending,
  } = useQuery(queries.USERS())
  useQuery(queries.INSTRUMENTS())

  if (isUsersPending) {
    return <ProfilesScreenSkeleton />
  }

  if (usersError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>An error occurred while fetching members {usersError.message}</p>
      </main>
    )
  }

  if (users.length === 0) {
    return (
      <main className="prose">
        <h1>Members</h1>
        <p>No members found.</p>
      </main>
    )
  }

  return <ProfilesScreen users={users} />
}
