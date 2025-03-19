import { getInstruments } from '@/lib/db/instruments/get'
import { getMember } from '@/lib/db/member/get_member'

import { SettingsSection } from '../../ui/settings_section'
import { SelectInstrumentForm } from './form'

export const SelectInstrument = async () => {
  const { instrument } = await getMember()
  const instruments = await getInstruments()

  return (
    <SettingsSection
      title="Instrument"
      description="This is the instrument you usually play during SUWO rehearsals. If you play multiple instruments, choose the one you play most often."
    >
      <SelectInstrumentForm instrument={instrument} instruments={instruments} />
    </SettingsSection>
  )
}
