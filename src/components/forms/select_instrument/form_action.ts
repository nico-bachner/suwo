'use server'

import { typeToFlattenedError, z } from 'zod'

import { Profile } from '@/generated/prisma'
import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'

type ActionState = {
  data: Pick<Profile, 'instrument_name'>
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
        formErrors: ['You must be logged in to select an instrument.'],
        fieldErrors: {},
      },
    }
  }

  const instruments = await prisma.instrument.findMany()

  const schema = z.object({
    instrument_name: z.nullable(
      z
        .string()
        .min(1)
        .max(30)
        .refine(
          (value) =>
            instruments.some((instrument) => instrument.name === value),
          {
            message: 'Not a known instrument',
          },
        ),
    ),
  })

  const { data, success, error } = await schema.safeParseAsync({
    instrument:
      formData.get('instrument') === '' ? null : formData.get('instrument'),
  })

  if (!success) {
    return {
      ...previousState,
      errors: error.flatten(),
    }
  }

  await prisma.profile.update({
    where: {
      user_id: id,
    },
    data: {
      instrument_name: data.instrument_name,
    },
  })

  return {
    ...previousState,
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  }
}
