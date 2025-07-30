'use client'

import { useForm } from '@tanstack/react-form'
import z from 'zod'

import { SubmitButton } from '@/design_system/submit_button'
import { TextInput } from '@/design_system/text_input'
import { UpdatePasswordValidator } from '@/features/auth/update_password_validator'
import { PasswordValidator } from '@/lib/validators/password'
import { apiRoutes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

const defaultValues: z.infer<typeof UpdatePasswordValidator> = {
  password: '',
}

export const UpdatePasswordForm = () => {
  const form = useForm({
    defaultValues,
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
      className="flex flex-col gap-1"
    >
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
            autoComplete="new-password"
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
          <SubmitButton canSubmit={canSubmit} isSubmitting={isSubmitting} />
        )}
      </form.Subscribe>
    </form>
  )
}
