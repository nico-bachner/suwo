import { getInstruments } from '@/lib/db/instruments/get'
import { getMember } from '@/lib/db/member/get_member'

import { SelectInstrumentForm } from './form'

export const SelectInstrument = async () => {
  const { instrument } = await getMember()
  const instruments = await getInstruments()

  return (
    <SelectInstrumentForm instrument={instrument} instruments={instruments} />
  )
}
