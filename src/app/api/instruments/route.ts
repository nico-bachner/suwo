import z from 'zod'

import { InstrumentValidator } from '@/lib/validators/instrument_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
  const instruments = await prisma.instrument.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: z.array(InstrumentValidator).parse(instruments),
  })
}

export const POST: APIRoute = async (request) => {
  const { data, error, success } = InstrumentValidator.omit({
    id: true,
    created_at: true,
    updated_at: true,
  }).safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const instrument = await prisma.instrument.create({
    data,
  })

  return createResponse({
    status: StatusCode.Created,
    data: InstrumentValidator.parse(instrument),
  })
}
