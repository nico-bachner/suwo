import { prettifyError } from 'zod'

import { LogWeeklyAttendanceCoerceValidator } from '@/features/attendance/validators'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const POST: APIRoute = async (_, { params }) => {
  const { data, error, success } = LogWeeklyAttendanceCoerceValidator.safeParse(
    await params,
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: await prisma.attendance.upsert({
      where: {
        user_id_year_semester_week: data,
      },
      create: data,
      update: data,
    }),
  })
}
