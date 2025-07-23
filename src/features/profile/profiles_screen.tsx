'use client'

import { useQuery } from '@tanstack/react-query'

import { queries } from '@/queries'

import { ProfilePreview, ProfilePreviewSkeleton } from './profile_preview'

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
              <ProfilePreviewSkeleton key={index} />
            ))
          : profiles.map((profile) => (
              <ProfilePreview key={profile.user_id} {...profile} />
            ))}
      </div>
    </div>
  )
}
