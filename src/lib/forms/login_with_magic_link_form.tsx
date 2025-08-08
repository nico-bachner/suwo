'use client'

import { TextInput } from '@/design_system/input/text_input'
import {
  LoginWithMagicLinkFormInput,
  LoginWithMagicLinkFormInputValidator,
} from '@/lib/validators/form_input_validators/login_with_magic_link_form_input_validator'
import { apiRoutes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { useAppForm } from './context'

export const LoginWithMagicLinkForm = () => {
  const defaultValues: LoginWithMagicLinkFormInput = {
    email: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: LoginWithMagicLinkFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.LOGIN_WITH_MAGIC_LINK(), {
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
          // eslint-disable-next-line no-alert, no-undef
          alert(`Email with login link has been sent to ${value.email}.`)
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
      <form.Field name="email">
        {({ state, name, handleBlur, handleChange }) => (
          <TextInput
            name={name}
            label="Email Address"
            placeholder='e.g. "name@example.com"'
            autoComplete="email"
            value={state.value}
            issues={state.meta.errors}
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
