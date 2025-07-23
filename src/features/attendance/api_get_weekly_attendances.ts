import { prettifyError } from 'zod'

import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

import { getSession } from '../auth/session/get_session'
import { WeeklyAttendancesCoerceValidator } from './validators'

export const getWeeklyAttendances: APIRoute = async (_, { params }) => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user_id,
    },
  })

  if (!user) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: 'Invalid cookie',
    })
  }

  const { data, error, success } = WeeklyAttendancesCoerceValidator.safeParse(
    await params,
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  const weeklyAttendances = await prisma.attendance.findMany({
    where: data,
  })

  return createResponse({
    status: StatusCode.OK,
    data: weeklyAttendances,
  })
}
