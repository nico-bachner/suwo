'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { Switch } from '@/design_system/switch'
import { queries } from '@/lib/queries'

import { UserInput, UserInputValidator } from '../dtos/user_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

export const RegisterForm = () => {
  const queryClient = useQueryClient()
  const { mutate: createUser } = useMutation(mutations.USERS(queryClient))
  const { data: instruments, isPending: isInstrumentsPending } = useQuery(
    queries.INSTRUMENTS(),
  )

  const defaultValues: UserInput = {
    email: '',
    given_name: '',
    mailing_list_preference: true,
    family_name: '',
    password: '',
    usu_number: '',
    events: [],
    instruments: [],
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: UserInputValidator,
    },
    onSubmit: ({ value }) => {
      createUser(value)
    },
  })

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        event.stopPropagation()
        await form.handleSubmit()
      }}
      className="@container flex flex-col gap-8"
    >
      <div className="mx-auto grid w-full max-w-screen-sm grid-cols-1 gap-4 sm:grid-cols-2">
        <form.AppField name="given_name">
          {(field) => (
            <field.Text
              label="Given Name"
              placeholder='e.g. "Ambrose"'
              autoComplete="given-name"
            />
          )}
        </form.AppField>

        <form.AppField name="family_name">
          {(field) => (
            <field.Text
              label="Family Name"
              placeholder='e.g. "Phelps"'
              autoComplete="family-name"
            />
          )}
        </form.AppField>

        <form.AppField name="email">
          {(field) => (
            <field.Email
              label="Email Address"
              autoComplete="email"
              className="sm:col-span-2"
            />
          )}
        </form.AppField>

        <form.AppField name="usu_number">
          {(field) => (
            <field.Text
              label="USU Number"
              placeholder='e.g. "1234567"'
              inputMode="numeric"
              className="sm:col-span-2"
            />
          )}
        </form.AppField>
      </div>

      <form.Field name="instruments">
        {({ state, handleChange }) => (
          <div className="grid grid-cols-2 gap-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5">
            {isInstrumentsPending
              ? Array.from({ length: 30 }, (_, index) => (
                  <Button key={index} variant="secondary">
                    Loading...
                  </Button>
                ))
              : instruments?.map((instrument) => (
                  <Button
                    key={instrument.id}
                    variant={
                      state.value.includes(instrument.id)
                        ? 'success'
                        : 'secondary'
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
            className="self-center"
          />
        )}
      </form.Field>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
