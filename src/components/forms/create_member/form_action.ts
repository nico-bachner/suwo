'use server'

import { createMember } from '@/lib/db/member/create'
import { verifyEmailExists } from '@/lib/db/member/verify_email_exists'
import { Member } from '@/lib/db/types'
import { Action } from '@/lib/zod/types'
import { validateEmail } from '@/lib/zod/validations/email'
import { validateFamilyName } from '@/lib/zod/validations/family_name'
import { validateGivenName } from '@/lib/zod/validations/given_name'
import { validateInstrument } from '@/lib/zod/validations/instrument'
import { validatePassword } from '@/lib/zod/validations/password'
import { validateUSU } from '@/lib/zod/validations/usu'
import { validateMailingList } from '@/lib/zod/validations/validate_mailing_list'

export const formAction: Action<Omit<Member, 'id'>> = async (_, formData) => {
  const state = {
    given_name: await validateGivenName(formData.get('given-name')),
    family_name: await validateFamilyName(formData.get('family-name')),
    email: await validateEmail(formData.get('email')),
    password: await validatePassword(formData.get('password')),
    usu: await validateUSU(formData.get('usu')),
    instrument: await validateInstrument(formData.get('instrument')),
    mailing_list: await validateMailingList(formData.get('mailing-list')),
  }

  if (
    !state.given_name.success ||
    !state.family_name.success ||
    !state.email.success ||
    !state.password.success ||
    !state.usu.success ||
    !state.instrument.success ||
    !state.mailing_list.success
  ) {
    return state
  }

  const member = await verifyEmailExists(state.email.data)

  if (member) {
    return state
  }

  return await createMember({
    given_name: state.given_name.data,
    family_name: state.family_name.data,
    email: state.email.data,
    password: state.password.data,
    usu: state.usu.data,
    instrument: state.instrument.data,
    mailing_list: state.mailing_list.data,
  })
}
