'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { TextInput } from '@/components/ui/text_input'

import { updatePasswordFormAction } from './form_action'

export const UpdatePasswordForm = () => {
  const [state, formAction, pending] = useActionState(
    updatePasswordFormAction,
    {
      data: {
        password: '',
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
      message="Update Password"
      variant="secondary"
    >
      <TextInput
        type="password"
        name="password"
        label="New Password"
        placeholder='e.g. "I<3SUWO25"'
        defaultValue={state.data.password ?? undefined}
        errors={state.errors.fieldErrors.password}
      />
    </Form>
  )
}
