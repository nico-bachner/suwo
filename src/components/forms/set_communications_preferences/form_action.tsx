'use server'

import { typeToFlattenedError, z } from 'zod'

import { updateMailingListPreference } from '@/lib/db/member/update_mailing_list_preference'
import { Member } from '@/lib/db/types'

type ActionState = {
  data: Pick<Member, 'mailing_list'>
  errors: typeToFlattenedError<ActionState['data'], string>
}

export const formAction = async (
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const schema = z.object({
    mailing_list: z.boolean(),
  })

  const { data, success, error } = await schema.safeParseAsync({
    mailing_list: formData.get('mailing-list') == 'on',
  })

  if (!success) {
    return {
      ...previousState,
      errors: error.flatten(),
    }
  }

  await updateMailingListPreference(data.mailing_list)

  return {
    ...previousState,
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  }
}
