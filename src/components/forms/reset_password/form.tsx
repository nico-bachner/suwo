'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { TextInput } from '@/components/ui/text_input'

import { formAction } from './form_action'

export const ResetPasswordForm = () => {
  const [state, action, pending] = useActionState(formAction, {
    data: {
      email: '',
    },
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  })

  return (
    <Form
      id="new-member-form"
      action={action}
      errors={state.errors.formErrors}
      pending={pending}
      message="Reset Password"
    >
      <TextInput
        type="email"
        name="email"
        label="Email Address"
        required
        placeholder='e.g. "name@example.com"'
        defaultValue={state.data.email ?? undefined}
        errors={state.errors.fieldErrors.email}
      />
    </Form>
  )
}
