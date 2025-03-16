'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { TextInput } from '@/components/ui/text_input'

import { editPasswordFormAction } from './edit_password_form_action'

export const EditPasswordForm = () => {
  const [state, formAction, pending] = useActionState(editPasswordFormAction, {
    data: {
      password: '',
    },
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  })

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
        label="Password"
        placeholder='e.g. "I<3SUWO25"'
        defaultValue={state.data.password ?? undefined}
        errors={state.errors.fieldErrors.password}
      />
    </Form>
  )
}
