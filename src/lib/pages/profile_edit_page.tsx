'use client'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { SettingsSection } from '@/design_system/settings_section'
import { Heading } from '@/design_system/typography'
import { getProfileScreenName } from '@/features/profile/get_profile_screen_name'
import { CreateInstrumentForm } from '@/lib/forms/create_instrument_form'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'

import { UpdateUserInstrumentsForm } from '../forms/update_user_instruments_form'
import { ProfileDTO } from '../validators/profile_dto_validator'

export const ProfileEditPage = ({ user_id }: Pick<ProfileDTO, 'user_id'>) => {
  const {
    data: profile,
    error: profileError,
    isPending: isProfilePending,
  } = useQuery(queries.PROFILE(user_id))
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())

  const isPending = isProfilePending || isSessionPending
  const error = profileError || sessionError

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

  if (!profile) {
    return (
      <main className="prose">
        <h1>Profile Not Found</h1>
        <p>The profile you are looking for does not exist.</p>
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

  if (session.user_id !== user_id) {
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
          Edit Profile: {getProfileScreenName(profile)}
        </Heading>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <SettingsSection
          title="Instruments"
          description="Tell us what instruments you play"
        >
          <UpdateUserInstrumentsForm user_id={session.user_id} />
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
