'use client'

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

import { SearchInput } from '@/design_system/input'
import { getUserDisplayName } from '@/features/user/get_user_display_name'
import { UserInstruments } from '@/features/user/user_instruments'
import { queries, queryKeys } from '@/lib/queries'
import { search } from '@/utils/search'

import { routes } from '../routes'

export const ProfilesPage = () => {
  const queryClient = useQueryClient()
  const [query, setQuery] = useState('')
  const { data: users } = useSuspenseQuery(queries.USERS())

  /**
   * Prime each individual user's query by pre-populating the query cache with
   * user data
   */
  users.forEach((user) => {
    queryClient.setQueryData(queryKeys.USER(user.id), user)
  })

  if (users.length === 0) {
    return (
      <main className="prose">
        <h1>Members</h1>
        <p>No members found.</p>
      </main>
    )
  }

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
            <Link
              key={user.id}
              href={routes.PROFILE(user.id)}
              className="bg-neutral-5/80 border-neutral-4/80 flex flex-col gap-1 rounded-3xl border px-6 py-4 font-bold backdrop-blur transition-transform outline-none hover:scale-105 focus:scale-105"
            >
              <p className="text-neutral-2">{getUserDisplayName(user)}</p>
              <UserInstruments
                user={user}
                className="text-neutral-3 line-clamp-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
