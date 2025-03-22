'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { SwitchInput } from '@/components/ui/switch_input'
import { Member } from '@/lib/db/types'

import { formAction } from './form_action'

type SetCommunicationsPreferencesFormProps = Pick<Member, 'mailing_list'>

export const SetCommunicationsPreferencesForm = ({
  mailing_list,
}: SetCommunicationsPreferencesFormProps) => {
  const [state, action, pending] = useActionState(formAction, {
    data: {
      mailing_list,
    },
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  })

  return (
    <Form
      action={action}
      errors={state.errors.formErrors}
      pending={pending}
      message="Update Communications Preference"
      variant="secondary"
    >
      <SwitchInput
        name="mailing-list"
        label="Weekly Member Emails"
        defaultChecked={state.data.mailing_list}
      />
    </Form>
  )
}
