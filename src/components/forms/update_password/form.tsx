'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { TextInput } from '@/components/ui/text_input'

import { formAction } from './form_action'

export const UpdatePasswordForm = () => {
  const [state, action, pending] = useActionState(formAction, {
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
      action={action}
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
        defaultValue={state.data.password}
        errors={state.errors.fieldErrors.password}
      />
    </Form>
  )
}
