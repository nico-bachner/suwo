import { SelectInstrument } from '@/components/forms/select_instrument'
import { PageLayout } from '@/components/server/page_layout'
import { SettingsSection } from '@/design_system/settings_section'

import { ProfileScreenProps } from './types'

export const EditProfileScreen = ({ profile }: ProfileScreenProps) => (
  <PageLayout
    parent={{
      title: `View Profile`,
      href: `/members/${profile.handle}`,
    }}
    title={profile.display_name ?? undefined}
    subtitle={profile.instrument_name ?? undefined}
    className="flex flex-col gap-12"
  >
    <SettingsSection
      title="Instrument"
      description="This is the instrument you usually play during SUWO rehearsals. If you play multiple instruments, choose the one you play most often."
    >
      <SelectInstrument />
    </SettingsSection>
  </PageLayout>
)
