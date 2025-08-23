import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { SearchInput } from '@/design_system/input'
import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { queryKeys } from '@/lib/queries'
import { search } from '@/utils/search'

import { ProfilePreview, ProfilePreviewSkeleton } from './profile_preview'

type ProfilesScreenProps = {
  users: UserDTO[]
}

export const ProfilesScreen = ({ users }: ProfilesScreenProps) => {
  const queryClient = useQueryClient()
  const [query, setQuery] = useState('')

  /**
   * Prime each individual user's query by pre-populating the query cache with
   * user data
   */
  users.forEach((user) => {
    queryClient.setQueryData(queryKeys.USER(user.id), user)
  })

  const searchedUsers = search({
    data: users,
    keys: ['given_name', 'family_name', 'instrument_name'],
    query,
  })

  return (
    <main className="prose">
      <h1>Members</h1>

      <div className="flex flex-col gap-6">
        <SearchInput
          value={query}
          onChange={({ target }) => {
            setQuery(target.value)
          }}
          placeholder="Search by name or instrument"
          className="mx-auto w-full max-w-screen-sm"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {searchedUsers.map((user) => (
            <ProfilePreview key={user.id} {...user} />
          ))}
        </div>
      </div>
    </main>
  )
}

export const ProfilesScreenSkeleton = () => (
  <main className="prose">
    <h1>Members</h1>

    <div className="flex flex-col gap-6">
      <SearchInput
        placeholder="Search by name or instrument"
        className="mx-auto w-full max-w-screen-sm"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 30 }).map((_, index) => (
          <ProfilePreviewSkeleton key={index} />
        ))}
      </div>
    </div>
  </main>
)
