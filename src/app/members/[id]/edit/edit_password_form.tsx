'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
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
    <Form action={formAction}>
      <TextInput
        type="password"
        name="password"
        label="Password"
        placeholder='e.g. "I<3SUWO25"'
        defaultValue={state.data.password ?? undefined}
        errors={state.errors.fieldErrors.password}
      />

      <Button variant="secondary" disabled={pending} className="self-end">
        Update Password
      </Button>
    </Form>
  )
}
