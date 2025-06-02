'use server'

import { typeToFlattenedError, z } from 'zod'

import { getInstruments } from '@/lib/db/instruments/get'
import { createMemberFromRollCall } from '@/lib/db/member/create_from_roll_call'
import { verifyEmailExists } from '@/lib/db/member/verify_email_exists'
import { createRollCallEntry } from '@/lib/db/roll_call_entry/create'
import { Member } from '@/lib/db/types'
import { getCurrentSemester } from '@/utils/usyd/get_current_semester'
import { getCurrentWeek } from '@/utils/usyd/get_current_week'
import { getCurrentYear } from '@/utils/usyd/get_current_year'

type ActionState = {
  data: Omit<Member, 'id'>
  errors: typeToFlattenedError<ActionState['data']>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const instruments = await getInstruments()

  const schema = z.object({
    given_name: z
      .string()
      .min(1, {
        message: 'Given name must be at least 1 character long',
      })
      .max(30, {
        message: 'Given name must be at most 30 characters long',
      })
      .trim(),
    family_name: z.nullable(
      z
        .string()
        .max(30, {
          message: 'Family name must be at most 30 characters long',
        })
        .trim(),
    ),
    email: z.string().email().trim(),
    usu: z.nullable(
      z
        .string()
        .regex(/^\d+$/u, {
          message: 'USU number, if provided, must contain only digits',
        })
        .length(7, {
          message: 'USU number, if provided, must be 7 digits',
        }),
    ),
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
    mailing_list: z.boolean(),
  })

  const { data, success, error } = await schema.safeParseAsync({
    given_name: formData.get('given-name'),
    family_name:
      formData.get('family-name') == '' ? null : formData.get('family-name'),
    email: formData.get('email'),
    usu: formData.get('usu') == '' ? null : formData.get('usu'),
    instrument:
      formData.get('instrument') == '' ? null : formData.get('instrument'),
    mailing_list: formData.get('mailing-list') == 'on',
  })

  if (!success) {
    return {
      ...previousState,
      errors: error.flatten(),
    }
  }

  const member = await verifyEmailExists(data.email)

  if (member) {
    return {
      ...previousState,
      errors: {
        fieldErrors: {},
        formErrors: ['Member already exists. Please check the list again.'],
      },
    }
  }
  const { id } = await createMemberFromRollCall({
    ...data,
    usu: data.usu ? parseInt(data.usu, 10) : null,
  })

  const currentWeek = await getCurrentWeek()

  if (currentWeek) {
    await createRollCallEntry({
      member: id,
      year: getCurrentYear(),
      semester: getCurrentSemester(),
      week: currentWeek,
    })
  }

  return {
    ...previousState,
    errors: {
      fieldErrors: {},
      formErrors: [],
    },
  }
}
