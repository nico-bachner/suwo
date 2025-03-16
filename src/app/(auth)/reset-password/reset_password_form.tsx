'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
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

      <Button variant="primary" disabled={pending} className="mt-4">
        Reset Password
      </Button>
    </Form>
  )
}
