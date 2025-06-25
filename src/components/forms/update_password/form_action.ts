'use server'

import { hash } from 'argon2'
import { typeToFlattenedError, z } from 'zod'

import { User } from '@/generated/prisma'
import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'

type ActionState = {
  data: Pick<User, 'password'>
  errors: typeToFlattenedError<ActionState['data']>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const { id } = await getSession()

  if (!id) {
    return {
      ...previousState,
      errors: {
        formErrors: ['You must be logged in to update your password.'],
        fieldErrors: {},
      },
    }
  }

  const schema = z.object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/u, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[A-Z]/u, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[0-9]/u, {
        message: 'Password must contain at least one number.',
      })
      .regex(/[^a-zA-Z0-9]/u, {
        message: 'Password must contain at least one special character.',
      })
      .trim(),
  })

  const { data, success, error } = await schema.safeParseAsync({
    password: formData.get('password'),
  })

  if (!success) {
    return {
      ...previousState,
      errors: error.flatten(),
    }
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: await hash(data.password),
    },
  })

  return {
    ...previousState,
    errors: {
      fieldErrors: {},
      formErrors: [],
    },
  }
}
