import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () =>
  createResponse({
    status: StatusCode.OK,
    data: (await prisma.instrument.findMany()).toSorted((a, b) =>
      a.name.localeCompare(b.name),
    ),
  })
