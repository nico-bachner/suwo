'use server'

import { randomBytes } from 'crypto'
import { typeToFlattenedError, z } from 'zod'

import { SHORT_NAME } from '@/config'
import { ResetPasswordTemplate } from '@/emails/reset_password'
import { BASE_URL } from '@/lib/base_url'
import { getIDFromEmail } from '@/lib/db/member/get_id_from_email'
import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'
import { createVerificationToken } from '@/lib/db/verification_token/create'
import { emails } from '@/lib/resend'

type ResetPasswordFormActionState = {
  data: Pick<Member, 'email'>
  errors: typeToFlattenedError<ResetPasswordFormActionState['data'], string>
}

export const resetPasswordFormAction = async (
  previousState: ResetPasswordFormActionState,
  formData: FormData,
): Promise<ResetPasswordFormActionState> => {
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
        formErrors: [],
        fieldErrors: {
          email: ['Wrong email.'],
        },
      },
    }
  } else {
    const { token } = await createVerificationToken(id)

    await emails.send({
      from: `${SHORT_NAME} ${'<' + `reset-password@${process.env.RESEND_DOMAIN}` + '>'}`,
      to: [data.email, 'delivered@resend.dev'],
      subject: 'Reset Password',
      react: (
        <ResetPasswordTemplate
          link={`${BASE_URL}/verify-email/${id}?token=${token}`}
        />
      ),
    })

    return {
      ...previousState,
      errors: {
        formErrors: [],
        fieldErrors: {},
      },
    }
  }
}
