import { SettingsSection } from '@/design_system/settings_section'
import { prisma } from '@/utils/prisma'

import { ProfileScreenProps } from './types'
import { UpdateInstrumentForm } from './update_instrument_form'
import { getProfileScreenName } from './utils/get_profile_screen_name'

export const EditProfileScreen = async ({ profile }: ProfileScreenProps) => {
  const instruments = await prisma.instrument.findMany()

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
