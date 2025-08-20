import { deleteSession } from '@/features/auth/session/delete_session'
import { getSession } from '@/features/auth/session/get_session'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'

export const GET = async () => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Session cookie not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: session,
  })
}

export const DELETE = async () => {
  await deleteSession()

  return createResponse({
    status: StatusCode.NoContent,
  })
}
