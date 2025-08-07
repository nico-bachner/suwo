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
      token: data.token,
    },
  })

  if (!verificationToken) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: 'Token invalid',
    })
  }

  /** Check if the token is still valid. We set the expiration to 24 hours. */
  if (
    verificationToken.created_at < new Date(Date.now() - 24 * 60 * 60 * 1000)
  ) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: 'Token expired',
    })
  }

  await createSession({
    user_id: verificationToken.user_id,
  })

  /**
   * Delete all previous verification tokens for the user for security. This
   * approach is mode UX-friendly than deleting previous tokens after minting a
   * new one, since some users may click the magic link multiple times.
   */
  await prisma.verificationToken.deleteMany({
    where: {
      user_id: verificationToken.user_id,
    },
  })

  redirect(routes.SETTINGS())
}
