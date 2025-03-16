'use server'

import { revalidatePath } from 'next/cache'
import { typeToFlattenedError, z } from 'zod'

import { getInstruments } from '@/lib/db/instruments/get'
import { createMember } from '@/lib/db/member/create'
import { verifyEmailExists } from '@/lib/db/member/verify_email_exists'
import { Member } from '@/lib/db/types'

type CreateMemberFormActionState = {
  data: Omit<Member, 'id'>
  errors: typeToFlattenedError<CreateMemberFormActionState['data'], string>
}

export const createMemberFormAction = async (
  previousState: CreateMemberFormActionState,
  formData: FormData,
): Promise<CreateMemberFormActionState> => {
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
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number.',
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      })
      .trim(),
    usu: z.nullable(
      z
        .string()
        .regex(/^\d+$/, {
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
    password: formData.get('password'),
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
        formErrors: ['Member already exists. Please log in instead.'],
        fieldErrors: {},
      },
    }
  } else {
    await createMember({
      ...data,
      usu: data.usu ? parseInt(data.usu) : null,
    })
  }

  revalidatePath('/roll-call')

  return {
    ...previousState,
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  }
}
