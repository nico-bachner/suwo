'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { SettingsSection } from '@/design_system/settings_section'
import { UpdateMailingListPreferenceForm } from '@/lib/forms/update_mailing_list_preference_form'
import { UpdatePasswordForm } from '@/lib/forms/update_password_form'
import { mutations } from '@/lib/mutations'
import { routes } from '@/routes'

export default function Page() {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(mutations.DELETE_SESSION(queryClient))

  return (
    <main className="prose">
      <h1>Settings</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SettingsSection
          title="Communications Preferences"
          description="We send weekly emails to all SUWO members to keep you up to date with event scheduling and administrative issues. You can use the form below to set your communications preferences."
          className="mx-auto w-full max-w-screen-sm lg:max-w-screen-lg"
        >
          <UpdateMailingListPreferenceForm />
        </SettingsSection>

        <SettingsSection
          title="Password"
          description="If you want to log in using a password, you can set one here. You can also reset your password here. We recommend using a password manager to generate a secure password and keep track of it."
          className="mx-auto w-full max-w-screen-sm lg:max-w-screen-lg"
        >
          <UpdatePasswordForm />
        </SettingsSection>

        <Button
          variant="danger"
          onClick={() => {
            mutate()
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
