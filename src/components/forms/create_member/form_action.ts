'use server'

import { createMember } from '@/lib/db/member/create'
import { verifyEmailExists } from '@/lib/db/member/verify_email_exists'
import { Member } from '@/lib/db/types'
import { Action, ActionState } from '@/lib/zod/types'
import { validateEmail } from '@/lib/zod/validations/email'
import { validateFamilyName } from '@/lib/zod/validations/family_name'
import { validateGivenName } from '@/lib/zod/validations/given_name'
import { validateInstrument } from '@/lib/zod/validations/instrument'
import { validatePassword } from '@/lib/zod/validations/password'
import { validateUSU } from '@/lib/zod/validations/usu'
import { validateMailingList } from '@/lib/zod/validations/validate_mailing_list'

export const formAction: Action<Omit<Member, 'id'>> = async (_, formData) => {
  const results = await Promise.all([
    validateGivenName(formData.get('given-name')),
    validateFamilyName(formData.get('family-name')),
    validateEmail(formData.get('email')),
    validatePassword(formData.get('password')),
    validateUSU(formData.get('usu')),
    validateInstrument(formData.get('instrument')),
    validateMailingList(formData.get('mailing-list')),
  ])

  const [givenName, familyName, email, password, usu, instrument, mailingList] =
    results

  const state: ActionState<Omit<Member, 'id'>> = {
    given_name: givenName,
    family_name: familyName,
    email: email,
    password: password,
    usu: usu,
    instrument: instrument,
    mailing_list: mailingList,
  }

  if (
    !state.given_name.data ||
    !state.family_name?.data ||
    !state.email.data ||
    !state.password?.data ||
    !state.usu?.data ||
    !state.instrument?.data ||
    !state.mailing_list.data
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
