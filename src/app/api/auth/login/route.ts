import { verify } from 'argon2'
import { randomBytes } from 'crypto'
import { headers } from 'next/headers'
import z from 'zod'

import { RESEND_DOMAIN, SHORT_NAME } from '@/config'
import { createSession } from '@/features/auth/create_session'
import { MagicLinkEmailTemplate } from '@/features/auth/magic_link_email_template'
import { getUserDTO } from '@/lib/dtos/user_dto'
import { UserInputValidator } from '@/lib/dtos/user_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { createURL, URLValidator } from '@/utils/http/create_url'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next'
import { prisma } from '@/utils/prisma'
import { emails } from '@/utils/resend'

export const POST: APIRoute<'/api/auth/login'> = async (request) => {
  const headersList = await headers()
  const { data, error, success } = UserInputValidator.pick({
    email: true,
    password: true,
  }).safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const [user, events] = await Promise.all([
    prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        events: true,
        instruments: true,
      },
    }),
    prisma.event.findMany({
      where: {
        starts_at: {
          lt: new Date(),
        },
      },
    }),
  ])

  if (!user) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: `Email ${data.email} is not associated with any account`,
    })
  }

  /**
   * If the user provides a password, we attempt to log them in with it.
   * Otherwise, we send a magic link to their email address.
   */
  if (data.password) {
    if (!user.password) {
      return createResponse({
        status: StatusCode.BadRequest,
        error: `Password not set for user ${user.email}.\n\nPlease login using magic link instead`,
      })
    }

    const passwordMatch = await verify(user.password, data.password)

    if (!passwordMatch) {
      return createResponse({
        status: StatusCode.Unauthorized,
        error: 'Incorrect password',
      })
    }

    await createSession({
      user_id: user.id,
    })

    return createResponse({
      status: StatusCode.OK,
      data: getUserDTO(user, events),
    })
  }

  const { token } = await prisma.verificationToken.create({
    data: {
      user_id: user.id,
      token: randomBytes(32).toString('hex'),
    },
  })

  const callbackURL = createURL(
    URLValidator.parse({
      protocol: headersList.get('x-forwarded-proto'),
      host: headersList.get('x-forwarded-host') ?? headersList.get('host'),
      path: ['api', 'auth', 'validate-magic-link'],
      query: { token },
    }),
  )

  await emails.send({
    from: `${SHORT_NAME} <magic-link@${RESEND_DOMAIN}>`,
    to: [data.email],
    subject: 'Log in to your SUWO account',
    text: `Click the link below to log in to your account:\n\n${callbackURL}`,
    react: MagicLinkEmailTemplate({
      callbackURL,
    }),
  })

  return createResponse({
    status: StatusCode.OK,
    data: getUserDTO(user, events),
  })
}
