'use client'

import { useForm } from '@tanstack/react-form'

import { PasswordInput } from '@/design_system/password_input'
import { SubmitButton } from '@/design_system/submit_button'
import { apiRoutes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  UpdatePasswordFormInput,
  UpdatePasswordFormInputValidator,
} from '../form_input_validators/update_password_form_input_validator'

export const UpdatePasswordForm = () => {
  const defaultValues: UpdatePasswordFormInput = {
    password: '',
  }

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: UpdatePasswordFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.UPDATE_PASSWORD(), {
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
          alert('Password updated successfully.')
          break
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
      <form.Field name="password">
        {({ state, handleChange }) => (
          <PasswordInput
            autoComplete="new-password"
            value={state.value}
            onChange={({ target }) => {
              handleChange(target.value)
            }}
          />
        )}
      </form.Field>

      <form.Subscribe>
        {({ canSubmit, isSubmitting }) => (
          <SubmitButton canSubmit={canSubmit} isSubmitting={isSubmitting} />
        )}
      </form.Subscribe>
    </form>
  )
}
