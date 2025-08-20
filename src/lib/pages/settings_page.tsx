'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { SettingsSection } from '@/design_system/settings_section'
import { Heading } from '@/design_system/typography'
import { UpdateMailingListPreferenceForm } from '@/lib/forms/update_mailing_list_preference_form'
import { UpdatePasswordForm } from '@/lib/forms/update_password_form'
import { mutations } from '@/lib/mutations'
import { routes } from '@/routes'

import { queries } from '../queries'

export const SettingsPage = () => {
  const queryClient = useQueryClient()
  const { data: session, error, isPending } = useQuery(queries.SESSION())
  const { mutate: deleteSession } = useMutation(
    mutations.DELETE_SESSION(queryClient),
  )

  if (isPending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (error) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{error.message}</p>
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

  return (
    <main className="mx-auto flex w-full max-w-screen-sm flex-col gap-8 lg:max-w-screen-xl">
      <Heading
        as="h1"
        variant="primary"
        className="mx-auto w-full max-w-screen-sm"
      >
        Settings
      </Heading>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SettingsSection
          title="Communications Preferences"
          description="We send weekly emails to all SUWO members to keep you up to date with event scheduling and administrative issues. You can use the form below to set your communications preferences."
        >
          <UpdateMailingListPreferenceForm user_id={session.user_id} />
        </SettingsSection>

        <SettingsSection
          title="Password"
          description="If you want to log in using a password, you can set one here. You can also reset your password here. We recommend using a password manager to generate a secure password and keep track of it."
        >
          <UpdatePasswordForm />
        </SettingsSection>

        <Button
          variant="danger"
          onClick={() => {
            deleteSession()
            redirect(routes.HOME())
          }}
          className="col-span-1 mx-auto w-full max-w-screen-sm lg:col-span-2"
        >
          Log Out
        </Button>
      </div>
    </main>
  )
}
