'use server'

import { typeToFlattenedError, z } from 'zod'

import { Profile, User } from '@/generated/prisma'
import prisma from '@/lib/prisma'

type ActionState = {
  data: Pick<User, 'email' | 'password' | 'usu_number'> &
    Pick<Profile, 'given_name' | 'family_name' | 'instrument_name'> & {
      isMailingListRecipient: boolean
    }
  errors: typeToFlattenedError<ActionState['data']>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const instruments = await prisma.instrument.findMany()

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

  const userExists = Boolean(
    await prisma.user.findUnique({
      where: { email: data.email },
    }),
  )

  if (userExists) {
    return {
      ...previousState,
      errors: {
        formErrors: ['Member already exists. Please log in instead.'],
        fieldErrors: {},
      },
    }
  }

  await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      usu_number: data.usu,
      Profile: {
        create: {
          given_name: data.given_name,
          family_name: data.family_name,
          instrument_name: data.instrument,
        },
      },
      MailingListRecipient: {
        create: {
          email: data.email,
        },
      },
    },
  })

  await prisma.profile.create({
    data: {
      user: {
        connect: { email: data.email },
      },
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
