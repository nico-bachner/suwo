'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/design_system/button'
import { SearchInput } from '@/design_system/input'
import { queries } from '@/lib/queries'
import { search } from '@/utils/search'

export const MailingListRecipientsPage = () => {
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())
  const {
    data: mailingListRecipients,
    error: mailingListRecipientsError,
    isPending: isMailingListRecipientsPending,
  } = useQuery(queries.MAILING_LIST_RECIPIENTS())
  const [query, setQuery] = useState('')

  if (isSessionPending || isMailingListRecipientsPending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (sessionError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{sessionError.message}</p>
      </main>
    )
  }

  if (mailingListRecipientsError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{mailingListRecipientsError.message}</p>
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

  if (mailingListRecipients.length === 0) {
    return (
      <main className="prose">
        <h1>Equipment</h1>
        <p>There are currently no equipment items available.</p>
      </main>
    )
  }

  const rows = mailingListRecipients.map((recipient) => ({
    email: recipient.email,
  }))

  const csv = [
    Object.keys(rows[0]).join(','),
    ...rows.map((row) => Object.values(row).join(',')),
  ].join('\n')

  return (
    <main className="prose">
      <h1>Mailing List Recipients</h1>

      <div className="flex flex-col-reverse gap-2 sm:flex-row">
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
        }).map((mailingListRecipient) => (
          <p key={mailingListRecipient.user_id}>{mailingListRecipient.email}</p>
        ))}
      </div>
    </main>
  )
}
