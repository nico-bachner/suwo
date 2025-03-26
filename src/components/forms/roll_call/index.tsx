import { getInstruments } from '@/lib/db/instruments/get'

import { CreateMemberFromRollCallForm } from './form'

export const CreateMemberFromRollCall = async () => {
  const instruments = await getInstruments()

  return <CreateMemberFromRollCallForm instruments={instruments} />
}
