'use server'

import { typeToFlattenedError, z } from 'zod'

import { RESEND_DOMAIN, SHORT_NAME } from '@/config'
import { ResetPasswordTemplate } from '@/emails/reset_password'
import { BASE_URL } from '@/lib/base_url'
import { getIDFromEmail } from '@/lib/db/member/get_id_from_email'
import { Member } from '@/lib/db/types'
import { createVerificationToken } from '@/lib/db/verification_token/create'
import { emails } from '@/lib/resend'

type ActionState = {
  data: Pick<Member, 'email'>
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

  const id = await getIDFromEmail(data.email)

  if (!id) {
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
  const { token } = await createVerificationToken(id)

  const verificationLink = `${BASE_URL}/verify/${id}?token=${token}`

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
