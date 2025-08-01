'use client'

import { useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import z from 'zod'

import { TextInput } from '@/design_system/text_input'
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
      className="flex flex-col gap-1"
    >
      <form.Field
        name="email"
        validators={{
          onBlur: z.email(),
        }}
      >
        {({ state, name, handleBlur, handleChange }) => (
          <TextInput
            name={name}
            value={state.value}
            label="Email Address"
            placeholder='e.g. "name@example.com"'
            autoComplete="email"
            errors={state.meta.errors
              .map((error) => {
                switch (typeof error) {
                  case 'string':
                    return error
                  case 'object':
                    return error.message
                  default:
                    return null
                }
              })
              .filter((error) => error !== null)}
            onBlur={handleBlur}
            onChange={({ target }) => {
              handleChange(target.value)
            }}
          />
        )}
      </form.Field>
      <form.Field name="password">
        {({ state, name, handleBlur, handleChange }) => (
          <TextInput
            name={name}
            value={state.value}
            type="password"
            label="Password"
            placeholder='e.g. "I<3SUWO25!"'
            autoComplete="current-password"
            onBlur={handleBlur}
            onChange={({ target }) => {
              handleChange(target.value)
            }}
          />
        )}
      </form.Field>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
