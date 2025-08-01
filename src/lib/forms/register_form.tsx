'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { Switch } from '@/design_system/switch'
import { TextInput } from '@/design_system/text_input'
import { queries } from '@/lib/queries'
import { apiRoutes, queryKeys, routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  RegisterFormInput,
  RegisterFormInputValidator,
} from '../validators/form_input_validators/register_form_input_validator'
import { useAppForm } from './context'

export const RegisterForm = () => {
  const queryClient = useQueryClient()
  const { data: instruments } = useQuery(queries.INSTRUMENTS())

  const defaultValues: RegisterFormInput = {
    given_name: '',
    family_name: undefined,
    email: '',
    usu_number: undefined,
    instrument_ids: [],
    mailing_list_preference: true,
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: RegisterFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.REGISTER(), {
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
      <div className="flex flex-col gap-4 sm:flex-row">
        <form.Field name="given_name">
          {({ state, name, handleBlur, handleChange }) => (
            <TextInput
              name={name}
              value={state.value}
              label="Given Name"
              placeholder='e.g. "John"'
              autoComplete="given-name"
              required
              onBlur={handleBlur}
              onChange={({ target }) => {
                handleChange(target.value)
              }}
              className="flex-1"
            />
          )}
        </form.Field>

        <form.Field name="family_name">
          {({ state, name, handleBlur, handleChange }) => (
            <TextInput
              name={name}
              value={state.value}
              label="Family Name"
              placeholder='e.g. "Doe"'
              autoComplete="family-name"
              onBlur={handleBlur}
              onChange={({ target }) => {
                handleChange(target.value)
              }}
              className="flex-1"
            />
          )}
        </form.Field>
      </div>

      <form.Field name="email">
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
        <form.Field name="usu_number">
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
      </div>

      <h2>Instruments</h2>

      <form.Field name="instrument_ids">
        {({ state, handleChange }) => (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {instruments?.map((instrument) => (
              <Button
                key={instrument.id}
                variant={
                  state.value.includes(instrument.id) ? 'primary' : 'secondary'
                }
                onClick={() => {
                  handleChange((prev) =>
                    prev.includes(instrument.id)
                      ? prev.filter((id) => id !== instrument.id)
                      : [...prev, instrument.id],
                  )
                }}
              >
                {instrument.name}
              </Button>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="mailing_list_preference">
        {({ state, name, handleChange }) => (
          <Switch
            name={name}
            label="Sign up for weekly rehearsal updates"
            checked={state.value}
            onCheckedChange={handleChange}
            className="mt-4 self-center"
          />
        )}
      </form.Field>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
