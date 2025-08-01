'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { TextInput } from '@/design_system/text_input'
import { queries } from '@/lib/queries'
import { queryKeys } from '@/routes'
import { search } from '@/utils/search'

import { ProfilePreview, ProfilePreviewSkeleton } from './profile_preview'

export const ProfilesScreen = () => {
  const queryClient = useQueryClient()
  const { data: profiles, error, isPending } = useQuery(queries.PROFILES())
  const [query, setQuery] = useState('')

  if (error) {
    throw new Error(`Failed to fetch profiles: ${error.message}`)
  }

  if (profiles) {
    profiles.forEach((profile) => {
      queryClient.setQueryData(queryKeys.PROFILE(profile), profile)
    })
  }

  return (
    <main className="prose">
      <h1>Members</h1>

      <TextInput
        name="search"
        label="Search"
        type="search"
        onChange={({ target }) => {
          setQuery(target.value)
        }}
        placeholder="Search by name or instrument"
        className="mx-auto max-w-screen-sm"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 20 }).map((_, index) => (
              <ProfilePreviewSkeleton key={index} />
            ))
          : search({
              data: profiles,
              keys: ['given_name', 'family_name', 'instrument_name'],
              query,
            }).map((profile) => (
              <ProfilePreview key={profile.user_id} {...profile} />
            ))}
      </div>
    </main>
  )
}
