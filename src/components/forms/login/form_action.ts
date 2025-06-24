'use server'

import { verify } from 'argon2'
import { redirect } from 'next/navigation'
import { typeToFlattenedError, z } from 'zod'

import { routes } from '@/features/roll_call/config'
import { User } from '@/generated/prisma'
import { createSession } from '@/lib/auth/session/create_session'
import prisma from '@/lib/prisma'

type ActionState = {
  data: Pick<User, 'email' | 'password'>
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

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
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

  const passwordMatch = await verify(user.password, data.password)

  if (passwordMatch) {
    await createSession({
      id: user.id,
    })

    redirect(routes.ROLL_CALL)
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
