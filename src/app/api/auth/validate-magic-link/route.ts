import { redirect } from 'next/navigation'
import z from 'zod'

import { createSession } from '@/features/auth/session/create_session'
import { routes } from '@/routes'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async ({ nextUrl }) => {
  const { data, error, success } = z
    .object({
      user_id: z.uuid(),
      token: z.string(),
    })
    .safeParse(Object.fromEntries(nextUrl.searchParams))

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      ...data,
      created_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!verificationToken) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Invalid token',
    })
  }

  await createSession({
    user_id: verificationToken.user_id,
  })

  await prisma.verificationToken.delete({
    where: verificationToken,
  })

  redirect(routes.SETTINGS())
}
