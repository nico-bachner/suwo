import { getInstruments } from '@/lib/db/instruments/get'

import { CreateMemberForm } from './form'

export const CreateMember = async () => {
  const instruments = await getInstruments()

  return <CreateMemberForm instruments={instruments} />
}
