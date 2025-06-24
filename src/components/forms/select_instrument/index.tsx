import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'

import { SelectInstrumentForm } from './form'

export const SelectInstrument = async () => {
  const { id } = await getSession()

  if (!id) {
    return null
  }

  const profile = await prisma.profile.findUnique({
    where: {
      user_id: id,
    },
  })

  if (!profile) {
    return null
  }

  const instruments = await prisma.instrument.findMany()

  return (
    <SelectInstrumentForm
      instrument_name={profile.instrument_name}
      instruments={instruments}
    />
  )
}
