'use client'

import { useQuery } from '@tanstack/react-query'

import { SettingsPage } from '@/lib/pages/settings_page'
import { queries } from '@/lib/queries'

export default function Page() {
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())

  if (sessionError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>An error occurred while authenticating: {sessionError.message}</p>
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

  return <SettingsPage id={session.user_id} />
}
