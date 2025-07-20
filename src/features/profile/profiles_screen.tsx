'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { queries, routes } from '@/routes'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfilesScreen = () => {
  const { data: profiles, error, isPending } = useQuery(queries.profilesQuery())

  if (error) {
    throw new Error(`Failed to fetch profiles: ${error.message}`)
  }

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>Members</h1>

      {isPending
        ? Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="mb-2 h-6 animate-pulse bg-gray-200" />
          ))
        : profiles.map((profile) => (
            <Link
              key={profile.handle}
              href={routes.PROFILE(profile)}
              className="flex flex-col rounded-lg bg-gray-900 px-4 py-2 font-bold"
            >
              <span className="text-gray-300">
                {getProfileScreenName(profile)}
              </span>
              <span className="text-gray-500">{profile.instrument_name}</span>
            </Link>
          ))}
    </div>
  )
}
