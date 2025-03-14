'use server'

import { redirect } from 'next/navigation'
import { typeToFlattenedError, z } from 'zod'

import { createSession } from '@/lib/auth/session'
import { getMemberByEmail } from '@/lib/db/member/get'
import { verifyPassword } from '@/lib/db/member/verifyPassword'
import { Member } from '@/lib/db/types'

type LoginFormActionState = {
  data: Pick<Member, 'email' | 'password'>
  errors: typeToFlattenedError<LoginFormActionState['data'], string>
}

export const loginFormAction = async (
  previousState: LoginFormActionState,
  formData: FormData,
): Promise<LoginFormActionState> => {
  const schema = z.object({
    email: z.string().email().trim(),
    password: z.string().trim(),
  })

  const { data, success, error } = await schema.safeParseAsync({
    email: formData.get('email'),
    password: formData.get('password'),
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
    const passwordMatch = await verifyPassword(data)

    if (passwordMatch) {
      await createSession(member.id)

      redirect(`/members/${member.id}`)
    }

    return {
      ...previousState,
      errors: {
        formErrors: [],
        fieldErrors: {
          password: ['Wrong password.'],
        },
      },
    }
  }
}
