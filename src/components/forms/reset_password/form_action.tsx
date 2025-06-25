'use server'

import { randomBytes } from 'crypto'
import { typeToFlattenedError, z } from 'zod'

import { BASE_URL, RESEND_DOMAIN, SHORT_NAME } from '@/config'
import { ResetPasswordTemplate } from '@/emails/reset_password'
import { User } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { emails } from '@/lib/resend'

type ActionState = {
  data: Pick<User, 'email'>
  errors: typeToFlattenedError<ActionState['data']>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const schema = z.object({
    email: z.string().email().trim(),
  })

  const { data, success, error } = await schema.safeParseAsync({
    email: formData.get('email'),
  })

  if (!success) {
    return {
      ...previousState,
      errors: error.flatten(),
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    return {
      ...previousState,
      errors: {
        fieldErrors: {
          email: ['Wrong email.'],
        },
        formErrors: [],
      },
    }
  }

  const { token } = await prisma.verificationToken.create({
    data: {
      user_id: user.id,
      token: randomBytes(32).toString('hex'),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })

  const verificationLink = `${BASE_URL}/verify/${user.id}?token=${token}`

  await emails.send({
    from: `${SHORT_NAME} <reset-password@${RESEND_DOMAIN}>`,
    to: [data.email],
    subject: 'Reset Password',
    text: `Click the link below to reset your password:\n\n${verificationLink}`,
    react: <ResetPasswordTemplate link={verificationLink} />,
  })

  return {
    ...previousState,
    errors: {
      fieldErrors: {},
      formErrors: [],
    },
  }
}
