'use server'

import { typeToFlattenedError, z } from 'zod'

import { EmailTemplate } from '@/emails/reset_password'
import { getMemberByEmail } from '@/lib/db/member/get'
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

  const member = await getMemberByEmail(data.email)

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
      from: 'Acme <onboarding@resend.dev>',
      to: [data.email],
      subject: 'Reset Password',
      react: <EmailTemplate name={member.given_name} />,
    })

    console.log('Email error:', error)

    return {
      ...previousState,
      errors: {
        formErrors: [],
        fieldErrors: {},
      },
    }
  }
}
