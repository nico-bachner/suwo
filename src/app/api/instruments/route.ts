import { NextRequest } from 'next/server'
import z from 'zod'

import { createInstrument, getInstrumentDTO } from '@/lib/dtos/instrument_dto'
import { InstrumentDTOValidator } from '@/lib/dtos/instrument_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const instruments = await prisma.instrument.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      players: true,
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: instruments.map(getInstrumentDTO),
  })
}

export const POST = async (request: NextRequest) => {
  const { data, error, success } = InstrumentDTOValidator.omit({
    id: true,
    players: true,
    created_at: true,
    updated_at: true,
  }).safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const existingInstrument = await prisma.instrument.findUnique({
    where: {
      name: data.name,
    },
  })

  if (existingInstrument) {
    return createResponse({
      status: StatusCode.Conflict,
      error: `Instrument with name "${data.name}" already exists.`,
    })
  }

  const instrument = await prisma.instrument.create({
    data: createInstrument(data),
    include: {
      players: true,
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: getInstrumentDTO(instrument),
  })
}
