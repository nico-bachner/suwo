'use client'

import { useQuery } from '@tanstack/react-query'

import { SettingsSection } from '@/design_system/settings_section'
import { Profile } from '@/generated/prisma'
import { CreateInstrumentForm } from '@/lib/forms/create_instrument_form'
import { UpdateInstrumentForm } from '@/lib/forms/update_instrument_form'
import { queries } from '@/lib/queries'

import { getProfileScreenName } from './utils/get_profile_screen_name'

export const EditProfileScreen = ({ user_id }: Pick<Profile, 'user_id'>) => {
  const {
    data: profile,
    error,
    isPending,
  } = useQuery(queries.PROFILE({ user_id }))

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

  return (
    <main className="prose">
      <h1>{getProfileScreenName(profile)}</h1>

      {profile.roles.length > 0 && <p>{profile.roles.join(', ')}</p>}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SettingsSection
          title="Instruments"
          description="Tell us what instruments you play"
          className="mx-auto w-full max-w-screen-sm lg:max-w-screen-lg"
        >
          <UpdateInstrumentForm />
        </SettingsSection>

        <SettingsSection
          title="Can't find your instrument?"
          description="Add it below to help us improve our instrument list"
          className="mx-auto w-full max-w-screen-sm lg:max-w-screen-lg"
        >
          <CreateInstrumentForm />
        </SettingsSection>
      </div>
    </main>
  )
}
