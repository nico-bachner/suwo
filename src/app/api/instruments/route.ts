import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const instruments = await prisma.instrument.findMany()
  const sortedInstruments = instruments.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  )

  return createResponse({
    status: StatusCode.OK,
    data: sortedInstruments,
  })
}
