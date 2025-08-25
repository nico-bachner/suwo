'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { SettingsSection } from '@/design_system/settings_section'
import { Heading } from '@/design_system/typography'
import { UserUpdateMailingListPreferenceForm } from '@/lib/forms/user_update_mailing_list_preference_form'
import { UserUpdatePasswordForm } from '@/lib/forms/user_update_password_form'
import { mutations } from '@/lib/mutations'
import { routes } from '@/routes'

import { UserDTO } from '../dtos/user_dto_validator'
import { queries } from '../queries'

export const SettingsPage = ({ id }: Pick<UserDTO, 'id'>) => {
  const queryClient = useQueryClient()
  const { mutate: setSessions } = useMutation(mutations.SESSIONS(queryClient))
  const { mutate: setSession } = useMutation(mutations.SESSION(queryClient))
  const { mutate: setUser } = useMutation(mutations.USER(queryClient, id))

  const {
    data: user,
    error: userError,
    isPending: isUserPending,
  } = useQuery({
    ...queries.USER(id),
  })

  if (userError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>An error occurred while fetching user data: {userError.message}</p>
      </main>
    )
  }

  if (isUserPending) {
    return (
      <main className="prose">
        <h1>Loading user data...</h1>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="prose">
        <h1>User not found</h1>
        <p>Please log in again.</p>
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
          <UserUpdateMailingListPreferenceForm {...user} />
        </SettingsSection>

        <SettingsSection
          title="Password"
          description="If you want to log in using a password, you can set one here. You can also reset your password here. We recommend using a password manager to generate a secure password and keep track of it."
        >
          <UserUpdatePasswordForm {...user} />
        </SettingsSection>

        <Button
          variant="danger"
          onClick={() => {
            setSession(null)
            redirect(routes.HOME())
          }}
          className="col-span-1 mx-auto w-full max-w-screen-sm lg:col-span-2"
        >
          Log out
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            setSessions(null)
            redirect(routes.HOME())
          }}
          className="col-span-1 mx-auto w-full max-w-screen-sm lg:col-span-2"
        >
          Log out on all devices
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            setUser(null)
            redirect(routes.HOME())
          }}
          className="col-span-1 mx-auto w-full max-w-screen-sm lg:col-span-2"
        >
          Delete account
        </Button>
      </div>
    </main>
  )
}
