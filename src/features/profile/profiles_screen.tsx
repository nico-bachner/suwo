'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { SkeletonText } from '@/design_system/skeleton'
import { queries } from '@/queries'
import { routes } from '@/routes'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const ProfilesScreen = () => {
  const { data: profiles, error, isPending } = useQuery(queries.PROFILES())

  if (error) {
    throw new Error(`Failed to fetch profiles: ${error.message}`)
  }

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>Members</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {isPending
          ? Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="bg-neutral-6 flex flex-col gap-2 rounded-lg px-4 py-2"
              >
                <SkeletonText className="h-7" />
                <SkeletonText className="h-5" />
              </div>
            ))
          : profiles.map((profile) => (
              <Link
                key={profile.handle}
                href={routes.PROFILE(profile)}
                className="bg-neutral-6 flex flex-col gap-2 rounded-lg px-4 py-2 font-bold"
              >
                <span className="text-neutral-2 text-lg">
                  {getProfileScreenName(profile)}
                </span>
                <span className="text-neutral-3">
                  {profile.instrument_name}
                </span>
              </Link>
            ))}
      </div>
    </div>
  )
}
