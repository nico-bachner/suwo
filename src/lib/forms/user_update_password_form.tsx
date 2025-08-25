'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserDTO } from '../dtos/user_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

export const UserUpdatePasswordForm = (user: Pick<UserDTO, 'id'>) => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useMutation(
    mutations.USER(queryClient, user.id),
  )

  const form = useAppForm({
    defaultValues: {
      password: '',
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
