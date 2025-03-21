'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { TextInput } from '@/components/ui/text_input'

import { resetPasswordFormAction } from './reset_password_form_action'

export const ResetPasswordForm = () => {
  const [state, formAction, pending] = useActionState(resetPasswordFormAction, {
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
      action={formAction}
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
