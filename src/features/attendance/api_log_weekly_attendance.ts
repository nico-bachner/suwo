import { prettifyError } from 'zod'

import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

import { getSession } from '../auth/session/server/get_session'
import { LogWeeklyAttendanceCoerceValidator } from './validators'

export const logWeeklyAttendance: APIRoute = async (_, { params }) => {
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

  const { data, error, success } = LogWeeklyAttendanceCoerceValidator.safeParse(
    await params,
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  const attendanceEntry = await prisma.attendance.findUnique({
    where: {
      user_id_year_semester_week: data,
    },
  })

  if (attendanceEntry) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: 'Attendance entry already exists for this week',
    })
  }

  const attendanceEntryCreated = await prisma.attendance.create({
    data,
  })

  return createResponse({
    status: StatusCode.OK,
    data: attendanceEntryCreated,
  })
}
