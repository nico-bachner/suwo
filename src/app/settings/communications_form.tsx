'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { SwitchInput } from '@/components/ui/switch_input'
import { Member } from '@/lib/db/types'

import { editCommunicationsFormAction } from './communications_form_action'

type CommunicationsFormProps = Pick<Member, 'mailing_list'>

export const CommunicationsForm = ({
  mailing_list,
}: CommunicationsFormProps) => {
  const [state, formAction, pending] = useActionState(
    editCommunicationsFormAction,
    {
      data: {
        mailing_list,
      },
      errors: {
        formErrors: [],
        fieldErrors: {},
      },
    },
  )

  return (
    <Form
      action={formAction}
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
