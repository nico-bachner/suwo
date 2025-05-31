'use server'

import { typeToFlattenedError, z } from 'zod'

import { updateMemberPassword } from '@/lib/db/member/update_password'
import { Member } from '@/lib/db/types'

type ActionState = {
  data: Pick<Member, 'password'>
  errors: typeToFlattenedError<ActionState['data'], string>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
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

  await updateMemberPassword(data.password)

  return {
    ...previousState,
    errors: {
      fieldErrors: {},
      formErrors: [],
    },
  }
}
