'use client'

import { useActionState } from 'react'

import { Form } from '@/design_system/form'
import { TextInput } from '@/design_system/text_input'

import { formAction } from './form_action'

export const LoginForm = () => {
  const [state, action, pending] = useActionState(formAction, {
    data: {
      email: '',
      password: '',
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
      message="Log In"
    >
      <TextInput
        type="email"
        name="email"
        label="Email Address"
        required
        placeholder='e.g. "name@example.com"'
        defaultValue={state.data.email}
        errors={state.errors.fieldErrors.email}
      />

      <TextInput
        type="password"
        name="password"
        label="Password"
        required
        placeholder='e.g. "I<3SUWO25"'
        defaultValue={state.data.password}
        errors={state.errors.fieldErrors.password}
      />
    </Form>
  )
}
