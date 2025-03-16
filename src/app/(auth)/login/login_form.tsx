'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { TextInput } from '@/components/ui/text_input'

import { loginFormAction } from './login_form_action'

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState(loginFormAction, {
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

      <TextInput
        type="password"
        name="password"
        label="Password"
        required
        placeholder='e.g. "I<3SUWO25"'
        defaultValue={state.data.password ?? undefined}
        errors={state.errors.fieldErrors.password}
      />

      <Button variant="primary" disabled={pending} className="mt-4">
        Log In
      </Button>
    </Form>
  )
}
