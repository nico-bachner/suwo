import z from 'zod'

import { InstrumentsQueryResult } from '@/lib/queries/instruments_query'
import { CreateInstrumentFormInputValidator } from '@/lib/validators/form_input_validators/create_instrument_form_input_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
  const instruments = await prisma.instrument.findMany()
  const data: InstrumentsQueryResult = instruments.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  )

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}

export const POST: APIRoute = async (req) => {
  const { data, error, success } = CreateInstrumentFormInputValidator.safeParse(
    await req.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const instrument = await prisma.instrument.create({
    data: {
      name: data.instrument_name,
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: instrument,
  })
}
