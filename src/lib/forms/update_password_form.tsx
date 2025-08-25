'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  UserDTO,
  UserInput,
  UserInputValidator,
} from '../dtos/user_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

export const UpdatePasswordForm = (user: UserDTO) => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useMutation(
    mutations.USER(queryClient, user.id),
  )

  const defaultValues: Pick<UserInput, 'password'> = {
    password: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: UserInputValidator.pick({ password: true }),
    },
    onSubmit: ({ value }) => {
      updateUser(value)
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
      <form.AppField name="password">
        {(field) => (
          <field.Password label="New Password" autoComplete="new-password" />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
