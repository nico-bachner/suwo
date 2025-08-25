'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/design_system/button'
import { SearchInput } from '@/design_system/input'
import { queries } from '@/lib/queries'
import { search } from '@/utils/search'

export const MailingListPage = () => {
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())
  const {
    data: users,
    error: usersError,
    isPending: isUsersPending,
  } = useQuery(queries.USERS())
  const [query, setQuery] = useState('')

  if (sessionError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{sessionError.message}</p>
      </main>
    )
  }

  if (isSessionPending) {
    return (
      <main className="prose">
        <h1>Authenticating...</h1>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="prose">
        <h1>Not logged in</h1>
        <p>Please log in to view this page.</p>
      </main>
    )
  }

  if (usersError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{usersError.message}</p>
      </main>
    )
  }

  if (isUsersPending) {
    return (
      <main className="prose">
        <h1>Loading users...</h1>
      </main>
    )
  }

  const mailingListRecipients = users
    .filter((user) => user.mailing_list_preference)
    .map((user) => ({
      user_id: user.id,
      email: user.email,
    }))

  if (users.length === 0) {
    return (
      <main className="prose">
        <h1>No users found</h1>
        <p>There are no users in the mailing list.</p>
      </main>
    )
  }

  const csv = [
    Object.keys(mailingListRecipients[0]).join(','),
    ...mailingListRecipients.map((row) => Object.values(row).join(',')),
  ].join('\n')

  return (
    <main className="prose">
      <h1>Mailing List</h1>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
        <SearchInput
          value={query}
          onChange={({ target }) => {
            setQuery(target.value)
          }}
          className="flex-grow"
        />

        <Button variant="secondary" asChild>
          <a
            href={URL.createObjectURL(
              new Blob([csv], {
                type: 'text/csv;charset=utf-8;',
              }),
            )}
            download="suwo_mailing_list.csv"
          >
            Download as CSV
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {search({
          data: mailingListRecipients,
          keys: ['email'],
          query,
        }).map(({ user_id, email }) => (
          <p key={user_id}>{email}</p>
        ))}
      </div>
    </main>
  )
}
