'use server'

import { typeToFlattenedError, z } from 'zod'

import { getInstruments } from '@/lib/db/instruments/get'
import { updateMemberInstument } from '@/lib/db/member/update'
import { Member } from '@/lib/db/types'

type ActionState = {
  data: Pick<Member, 'instrument'>
  errors: typeToFlattenedError<ActionState['data']>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const instruments = await getInstruments()

  const schema = z.object({
    instrument: z.nullable(
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
      formData.get('instrument') == '' ? null : formData.get('instrument'),
  })

  if (!success) {
    return {
      ...previousState,
      errors: error.flatten(),
    }
  }

  await updateMemberInstument(data.instrument)

  return {
    ...previousState,
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  }
}
