import { randomBytes } from 'crypto'
import { z } from 'zod/v4'

import { BASE_URL, RESEND_DOMAIN, SHORT_NAME } from '@/config'
import prisma from '@/lib/prisma'
import { emails } from '@/lib/resend'
import { createResponse } from '@/utils/http/create_response'

import { MagicLinkEmailTemplate } from '../magic_link_email_template'
import { MagicLinkDetails } from '../magic_link_validation'
import { routes } from '../routes'

export const POST = async (request: Request) => {
  const { data, error, success } = MagicLinkDetails.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: 400,
      body: { error: z.prettifyError(error) },
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    return createResponse({
      status: 400,
      body: { error: 'Email not in use' },
    })
  }

  const { token } = await prisma.verificationToken.create({
    data: {
      user_id: user.id,
      token: randomBytes(32).toString('hex'),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })

  const verificationLink =
    BASE_URL +
    routes.API_MAGIC_LINK_VALIDATE({
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
    status: 200,
    body: { data },
  })
}
