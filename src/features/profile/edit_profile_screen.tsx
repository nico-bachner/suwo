'use client'

import { useQuery } from '@tanstack/react-query'

import { SettingsSection } from '@/design_system/settings_section'
import { Instrument, Profile } from '@/generated/prisma'
import { queries } from '@/queries'

import { UpdateInstrumentForm } from './update_instrument_form'
import { getProfileScreenName } from './utils/get_profile_screen_name'

export const EditProfileScreen = ({
  user_id,
  instruments,
}: Pick<Profile, 'user_id'> & {
  instruments: Instrument[]
}) => {
  const {
    data: profile,
    error,
    isPending,
  } = useQuery(queries.PROFILE({ user_id }))

  if (isPending) {
    return (
      <div className="prose mx-auto max-w-screen-sm px-4 py-8">Loading...</div>
    )
  }

  if (error) {
    return (
      <div className="prose mx-auto max-w-screen-sm px-4 py-8">
        {error.message}
      </div>
    )
  }

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>{getProfileScreenName(profile)}</h1>

      {profile.instrument_name && <p>{profile.instrument_name}</p>}

      <SettingsSection
        title="Instrument"
        description="This is the instrument you usually play during SUWO rehearsals. If you play multiple instruments, choose the one you play most often."
      >
        <UpdateInstrumentForm instruments={instruments} />
      </SettingsSection>
    </div>
  )
}
