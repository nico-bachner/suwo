'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserInputValidator } from '../dtos/user_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

export const LoginWithMagicLinkForm = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(mutations.LOGIN(queryClient))

  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onBlur: UserInputValidator.pick({
        email: true,
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
      <form.AppField name="email">
        {(field) => <field.Email label="Email Address" autoComplete="email" />}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
