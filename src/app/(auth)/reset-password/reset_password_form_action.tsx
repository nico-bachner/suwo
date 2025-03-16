'use server'

import { typeToFlattenedError, z } from 'zod'

import { SHORT_NAME } from '@/config'
import { ResetPasswordTemplate } from '@/emails/reset_password'
import { verifyEmailExists } from '@/lib/db/member/verify_email_exists'
import { Member } from '@/lib/db/types'
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

  const member = await verifyEmailExists(data.email)

  if (!member) {
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
    const { error } = await emails.send({
      from: `${SHORT_NAME} ${'<' + `reset-password@${process.env.RESEND_DOMAIN}` + '>'}`,
      to: [data.email, 'delivered@resend.dev'],
      subject: 'Reset Password',
      react: <ResetPasswordTemplate link="" />,
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
