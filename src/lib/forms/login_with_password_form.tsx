'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserInput, UserInputValidator } from '../dtos/user_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

export const LoginWithPasswordForm = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(mutations.LOGIN(queryClient))

  const defaultValues: Pick<UserInput, 'email' | 'password'> = {
    email: '',
    password: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: UserInputValidator.pick({
        email: true,
        password: true,
      }),
    },
    onSubmit: ({ value }) => {
      mutate(value)
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
      <div className="flex flex-col gap-2">
        <form.AppField name="email">
          {(field) => (
            <field.Email label="Email Address" autoComplete="email" />
          )}
        </form.AppField>

        <form.AppField name="password">
          {(field) => <field.Password autoComplete="current-password" />}
        </form.AppField>
      </div>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
