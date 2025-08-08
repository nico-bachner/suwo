'use client'

import { useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { EmailInput } from '@/design_system/input'
import {
  LoginWithPasswordFormInput,
  LoginWithPasswordFormInputValidator,
} from '@/lib/validators/form_input_validators/login_with_password_form_input_validator'
import { apiRoutes, queryKeys, routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { useAppForm } from './context'

export const LoginWithPasswordForm = () => {
  const queryClient = useQueryClient()

  const defaultValues: LoginWithPasswordFormInput = {
    email: '',
    password: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: LoginWithPasswordFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.LOGIN_WITH_PASSWORD(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        }),
      )

      switch (response.status) {
        case StatusCode.BadRequest:
          // eslint-disable-next-line no-alert, no-undef
          alert(`${response.error}\n\nPlease try again`)
          break
        case StatusCode.OK:
          await queryClient.invalidateQueries({
            queryKey: queryKeys.SESSION(),
          })

          redirect(routes.SETTINGS())
      }
    },
  })

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        event.stopPropagation()
        await form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <form.Field name="email">
        {({ name, state, handleBlur, handleChange }) => (
          <EmailInput
            label="Email Address"
            autoComplete="email"
            name={name}
            value={state.value}
            issues={state.meta.errors}
            onBlur={handleBlur}
            onChange={({ target }) => {
              handleChange(target.value)
            }}
          />
        )}
      </form.Field>
      <form.AppField name="password">
        {({ Password }) => <Password autoComplete="current-password" />}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
