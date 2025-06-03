'use client'

import { useActionState } from 'react'

import { Form } from '@/design_system/form'
import { Switch } from '@/design_system/switch/switch'
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
      <Switch
        name="mailing-list"
        label="Weekly Member Emails"
        defaultChecked={state.data.mailing_list}
      />
    </Form>
  )
}
