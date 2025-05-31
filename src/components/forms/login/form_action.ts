'use server'

import { redirect } from 'next/navigation'
import { typeToFlattenedError, z } from 'zod'

import { createSession } from '@/lib/auth/session'
import { getIDFromEmail } from '@/lib/db/member/get_id_from_email'
import { verifyPassword } from '@/lib/db/member/verify_password'
import { Member } from '@/lib/db/types'

type ActionState = {
  data: Pick<Member, 'email' | 'password'>
  errors: typeToFlattenedError<ActionState['data']>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const schema = z.object({
    email: z.string().email().trim(),
    password: z.string().trim().min(6, {
      message: 'Password must be at least 6 characters long.',
    }),
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
  }
  const passwordMatch = await verifyPassword(data)

  if (passwordMatch) {
    await createSession(id)

    redirect(`/members/${id}`)
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
