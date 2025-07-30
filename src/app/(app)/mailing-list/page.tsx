'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/design_system/button'
import { PageContainer } from '@/design_system/container'
import { TextInput } from '@/design_system/text_input'
import { queries } from '@/lib/queries'
import { search } from '@/utils/search'

export default function Page() {
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
  const [searchQuery, setSearchQuery] = useState('')

  if (isSessionPending || isMailingListRecipientsPending) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Loading...</h1>
      </PageContainer>
    )
  }

  if (sessionError) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Error</h1>
        <p>{sessionError.message}</p>
      </PageContainer>
    )
  }

  if (mailingListRecipientsError) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Error</h1>
        <p>{mailingListRecipientsError.message}</p>
      </PageContainer>
    )
  }

  if (!session) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Not logged in</h1>
        <p>Please log in to view this page.</p>
      </PageContainer>
    )
  }

  if (mailingListRecipients.length === 0) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Equipment</h1>
        <p>There are currently no equipment items available.</p>
      </PageContainer>
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
    <PageContainer size="sm" className="prose">
      <h1>Mailing List Recipients</h1>

      <Button variant="secondary" asChild className="mb-6">
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

      <TextInput
        name="search"
        label="Search"
        type="search"
        onChange={({ target }) => {
          setSearchQuery(target.value)
        }}
        placeholder="Search by name or instrument"
        className="mb-6"
      />

      <ul className="flex flex-col">
        {search({
          data: mailingListRecipients,
          keys: ['email'],
          query: searchQuery,
        }).map((mailingListRecipient) => (
          <li key={mailingListRecipient.user_id}>
            {mailingListRecipient.email}
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
