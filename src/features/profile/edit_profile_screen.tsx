'use client'

import { useQuery } from '@tanstack/react-query'

import { PageContainer } from '@/design_system/container'
import { SettingsSection } from '@/design_system/settings_section'
import { Profile } from '@/generated/prisma'
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
      <PageContainer size="sm" className="prose">
        <h1>Loading...</h1>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Error</h1>
        <p>Failed to load profile: {error.message}</p>
      </PageContainer>
    )
  }

  return (
    <PageContainer size="sm" className="prose">
      <h1>{getProfileScreenName(profile)}</h1>

      {profile.instrument_name && <p>{profile.instrument_name}</p>}

      <SettingsSection
        title="Instrument"
        description="This is the instrument you usually play during SUWO rehearsals. If you play multiple instruments, choose the one you play most often."
      >
        <UpdateInstrumentForm />
      </SettingsSection>
    </PageContainer>
  )
}
