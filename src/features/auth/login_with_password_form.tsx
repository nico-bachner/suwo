'use client'

import { useForm } from '@tanstack/react-form'
import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { Spinner } from '@/design_system/spinner'
import { TextInput } from '@/design_system/text_input'
import { EmailValidator } from '@/lib/validators/email'
import { PasswordValidator } from '@/lib/validators/password'
import { routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const LoginWithPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const response = await fetch(routes.API_LOGIN_WITH_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })

      const jsonResponse = await parseResponse(response)

      switch (jsonResponse.status) {
        case StatusCode.BadRequest:
          // eslint-disable-next-line no-alert, no-undef
          alert(`${jsonResponse.body.error}\n\nPlease try again`)
          break
        case StatusCode.OK:
          redirect(routes.SETTINGS)
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
          onBlur: EmailValidator,
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
      <form.Field
        name="password"
        validators={{
          onBlur: PasswordValidator,
        }}
      >
        {({ state, name, handleBlur, handleChange }) => (
          <TextInput
            name={name}
            value={state.value}
            type="password"
            label="Password"
            placeholder='e.g. "I<3SUWO25!"'
            autoComplete="current-password"
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
      <form.Subscribe>
        {({ canSubmit, isSubmitting }) => (
          <Button variant="primary" disabled={!canSubmit} className="mt-4">
            {isSubmitting ? (
              <Spinner className="stroke-neutral-3 h-6 w-6" />
            ) : (
              'Submit'
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
