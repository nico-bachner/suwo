'use server'

import { typeToFlattenedError, z } from 'zod'

import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'

type ActionState = {
  data: {
    isMailingListRecipient: boolean
  }
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
        formErrors: ['You must be logged in to update your preferences.'],
        fieldErrors: {},
      },
    }
  }

  const schema = z.object({
    isMailingListRecipient: z.boolean(),
  })

  const { data, success, error } = await schema.safeParseAsync({
    mailing_list: formData.get('mailing-list') === 'on',
  })

  if (!success) {
    return {
      ...previousState,
      errors: error.flatten(),
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    return {
      ...previousState,
      errors: {
        formErrors: ['User not found.'],
        fieldErrors: {},
      },
    }
  }

  if (data.isMailingListRecipient) {
    await prisma.mailingListRecipient.create({
      data: {
        email: user.email,
        user_id: user.id,
      },
    })
  } else {
    await prisma.mailingListRecipient.delete({
      where: {
        user_id: user.id,
      },
    })
  }

  return {
    ...previousState,
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  }
}
