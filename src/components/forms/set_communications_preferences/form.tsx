'use client'

import { useActionState } from 'react'

import { Form } from '@/design_system/form'
import { Switch } from '@/design_system/switch/switch'

import { formAction } from './form_action'

type SetCommunicationsPreferencesFormProps = {
  isMailingListRecipient: boolean
}

export const SetCommunicationsPreferencesForm = ({
  isMailingListRecipient,
}: SetCommunicationsPreferencesFormProps) => {
  const [state, action, pending] = useActionState(formAction, {
    data: {
      isMailingListRecipient,
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
        defaultChecked={state.data.isMailingListRecipient}
      />
    </Form>
  )
}
