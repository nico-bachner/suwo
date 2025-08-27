'use client'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { SettingsSection } from '@/design_system/settings_section'
import { Heading } from '@/design_system/typography'
import { getUserDisplayName } from '@/features/user/get_user_display_name'
import { CreateInstrumentForm } from '@/lib/forms/create_instrument_form'
import { queries } from '@/lib/queries'
import { routes } from '@/lib/routes'

import { UserDTO } from '../dtos/user_dto_validator'
import { UserUpdateInstrumentsForm } from '../forms/user_update_instruments_form'

export const ProfileEditPage = ({ id }: Pick<UserDTO, 'id'>) => {
  const {
    data: user,
    error: userError,
    isPending: isUserPending,
  } = useQuery(queries.USER(id))
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())

  const isPending = isSessionPending || isUserPending
  const error = sessionError || userError

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
        <h1>Not Authenticated</h1>
        <p>Please log in to edit your profile.</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="prose">
        <h1>User Not Found</h1>
        <p>The user you are trying to edit does not exist.</p>
      </main>
    )
  }

  if (session.user_id !== id) {
    return (
      <main className="prose">
        <h1>Forbidden</h1>
        <p>You do not have permission to edit this profile.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-screen-sm flex-col gap-8 lg:max-w-screen-xl">
      <div className="flex flex-col gap-x-16 gap-y-8 lg:flex-row lg:items-center">
        <Button variant="secondary" className="self-start" asChild>
          <Link href={routes.PROFILE(session.user_id)}>
            <ChevronLeftIcon className="-mx-1 size-5" />
            Back to Profile
          </Link>
        </Button>

        <Heading as="h1" variant="primary">
          Edit Profile: {getUserDisplayName(user)}
        </Heading>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <SettingsSection
          title="Instruments"
          description="Tell us what instruments you play"
        >
          <UserUpdateInstrumentsForm {...user} />
        </SettingsSection>

        <SettingsSection
          title="Can't find your instrument?"
          description="Add it below to help us improve our instrument list"
        >
          <CreateInstrumentForm />
        </SettingsSection>
      </div>
    </main>
  )
}
