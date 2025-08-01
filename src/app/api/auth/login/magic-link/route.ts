import { randomBytes } from 'crypto'
import { headers } from 'next/headers'
import z from 'zod'

import { RESEND_DOMAIN, SHORT_NAME } from '@/config'
import { MagicLinkEmailTemplate } from '@/features/auth/magic_link_email_template'
import { LoginWithMagicLinkFormInputValidator } from '@/lib/form_input_validators/login_with_magic_link_form_input_validator'
import { apiRoutes } from '@/routes'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'
import { emails } from '@/utils/resend'

export const POST = async (request: Request) => {
  const { data, error, success } =
    LoginWithMagicLinkFormInputValidator.safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
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

  // Invalidate any existing tokens for the user
  await prisma.verificationToken.deleteMany({
    where: {
      user_id: user.id,
    },
  })

  const token = await prisma.verificationToken.create({
    data: {
      user_id: user.id,
      token: randomBytes(32).toString('hex'),
    },
  })

  const headersList = await headers()
  const host = headersList.get('x-forwarded-host') || headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  // eslint-disable-next-line typescript/restrict-template-expressions
  const verificationLink = `${protocol}://${host}${apiRoutes.VALIDATE_MAGIC_LINK(
    token,
  )}`

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
