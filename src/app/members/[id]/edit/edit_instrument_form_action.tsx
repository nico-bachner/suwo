'use server'

import { typeToFlattenedError, z } from 'zod'

import { getInstruments } from '@/lib/db/instruments/get'
import { updateMemberInstument } from '@/lib/db/member/update'
import { Member } from '@/lib/db/types'

type InstrumentFormActionState = {
  data: {
    instrument: Member['instrument']
  }
  errors: typeToFlattenedError<
    {
      instrument: Member['instrument']
    },
    string
  >
}

export const editInstrumentFormAction = async (
  previousState: InstrumentFormActionState,
  formData: FormData,
): Promise<InstrumentFormActionState> => {
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
    data,
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  }
}
