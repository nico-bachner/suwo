'use server'

import { typeToFlattenedError, z } from 'zod'

import { getInstruments } from '@/lib/db/instruments/get'
import { updateMemberInstument } from '@/lib/db/member/update'

export const editInstrumentFormAction = async (
  previousState: unknown,
  formData: FormData,
): Promise<{
  instrument: string | null
  errors: typeToFlattenedError<string | null, string>
}> => {
  const instruments = await getInstruments()

  const schema = z.nullable(
    z
      .string()
      .min(1)
      .max(30)
      .refine(
        (value) => instruments.some((instrument) => instrument.name === value),
        {
          message: 'Not a known instrument',
        },
      ),
  )

  const { data, success, error } = await schema.safeParseAsync(
    formData.get('instrument') == '' ? null : formData.get('instrument'),
  )

  if (!success) {
    return {
      instrument: formData.get('instrument')?.toString() ?? null,
      errors: error.flatten(),
    }
  }

  await updateMemberInstument(data)

  return {
    instrument: data,
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  }
}
