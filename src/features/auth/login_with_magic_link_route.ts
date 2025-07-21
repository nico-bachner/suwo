import { randomBytes } from 'crypto'
import { prettifyError } from 'zod'

import { RESEND_DOMAIN, SHORT_NAME } from '@/config'
import { apiRoutes } from '@/routes'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'
import { emails } from '@/utils/resend'

import { LoginWithMagicLinkValidator } from './login_with_magic_link_validator'
import { MagicLinkEmailTemplate } from './magic_link_email_template'

export const POST = async (request: Request) => {
  const { data, error, success } = LoginWithMagicLinkValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: `Email ${data.email} not in use`,
    })
  }

  const { token } = await prisma.verificationToken.create({
    data: {
      user_id: user.id,
      token: randomBytes(32).toString('hex'),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })

  const verificationLink = apiRoutes.VALIDATE_MAGIC_LINK({
    user_id: user.id,
    token,
  })

  await emails.send({
    from: `${SHORT_NAME} <magic-link@${RESEND_DOMAIN}>`,
    to: [data.email],
    subject: 'Log in to your SUWO account',
    text: `Click the link below to log in to your account:\n\n${verificationLink}`,
    react: MagicLinkEmailTemplate({ link: verificationLink }),
  })

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
