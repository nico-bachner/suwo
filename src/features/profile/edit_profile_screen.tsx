'use client'

import { useQuery } from '@tanstack/react-query'

import { SettingsSection } from '@/design_system/settings_section'
import { Heading } from '@/design_system/typography'
import { Profile } from '@/generated/prisma'
import { CreateInstrumentForm } from '@/lib/forms/create_instrument_form'
import { UpdateInstrumentForm } from '@/lib/forms/update_instrument_form'
import { queries } from '@/lib/queries'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const EditProfileScreen = ({ user_id }: Pick<Profile, 'user_id'>) => {
  const {
    data: profile,
    error: profileError,
    isPending: isProfilePending,
  } = useQuery(queries.PROFILE({ user_id }))
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
      <Heading
        as="h1"
        variant="primary"
        className="mx-auto w-full max-w-screen-sm"
      >
        {getProfileScreenName(profile)}
      </Heading>

      {profile.roles.length > 0 && <p>{profile.roles.join(', ')}</p>}

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <SettingsSection
          title="Instruments"
          description="Tell us what instruments you play"
        >
          <UpdateInstrumentForm />
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
