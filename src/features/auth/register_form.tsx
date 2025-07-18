'use client'

import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { Button } from '@/design_system/button'
import { Checkbox } from '@/design_system/checkbox'
import { Select, SelectItem } from '@/design_system/select'
import { Spinner } from '@/design_system/spinner'
import { TextInput } from '@/design_system/text_input'
import { Instrument } from '@/generated/prisma'
import { EmailValidator } from '@/lib/validators/email'
import { FamilyNameValidator } from '@/lib/validators/family_name'
import { GivenNameValidator } from '@/lib/validators/given_name'
import { routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { RegisterValidator } from './register_validator'
import { SESSION_QUERY_KEY } from './session/client/use_session_query'

type RegisterFormProps = {
  instruments: Instrument[]
}

const defaultValues: z.infer<typeof RegisterValidator> = {
  given_name: '',
  family_name: undefined,
  email: '',
  usu_number: undefined,
  instrument_name: undefined,
  mailing_list_preference: true,
}

export const RegisterForm = ({ instruments }: RegisterFormProps) => {
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(routes.API_REGISTER, {
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
            queryKey: SESSION_QUERY_KEY,
          })

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
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <form.Field
          name="given_name"
          validators={{
            onBlur: GivenNameValidator,
          }}
        >
          {({ state, name, handleBlur, handleChange }) => (
            <TextInput
              name={name}
              value={state.value}
              label="Given Name"
              placeholder='e.g. "John"'
              autoComplete="given-name"
              required
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
              className="flex-1"
            />
          )}
        </form.Field>

        <form.Field
          name="family_name"
          validators={{
            onBlur: FamilyNameValidator.optional(),
          }}
        >
          {({ state, name, handleBlur, handleChange }) => (
            <TextInput
              name={name}
              value={state.value}
              label="Family Name"
              placeholder='e.g. "Doe"'
              autoComplete="family-name"
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
              className="flex-1"
            />
          )}
        </form.Field>
      </div>

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
            required
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

      <div className="flex flex-col gap-4 sm:flex-row">
        <form.Field
          name="usu_number"
          validators={{
            onBlur: FamilyNameValidator.optional(),
          }}
        >
          {({ state, name, handleBlur, handleChange }) => (
            <TextInput
              name={name}
              value={state.value}
              label="USU Number"
              placeholder='e.g. "1234567"'
              inputMode="numeric"
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
              className="flex-1"
            />
          )}
        </form.Field>

        <form.Field name="instrument_name">
          {({ state, name, handleChange }) => (
            <Select
              name={name}
              value={state.value}
              label="Instrument"
              onValueChange={handleChange}
              placeholder="Select Instrument..."
            >
              {instruments.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </Select>
          )}
        </form.Field>
      </div>

      <form.Field name="mailing_list_preference">
        {({ state, name, handleChange }) => (
          <Checkbox
            name={name}
            label="Sign up for weekly rehearsal updates"
            checked={state.value}
            onCheckedChange={(value) => {
              switch (value) {
                case true:
                case false:
                  handleChange(value)
                  break
                default:
                  handleChange(true)
                  break
              }
            }}
            className="mt-4 self-center"
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
