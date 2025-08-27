import { prisma } from '@/utils/prisma'

import { getInstrumentDTO } from '../dtos/instrument_dto'

export const fetchInstruments = async () => {
  const instruments = await prisma.instrument.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      players: true,
    },
  })

  return instruments.map(getInstrumentDTO)
}
