'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Switch } from '@/design_system/switch'

import { UserDTO } from '../dtos/user_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

type UpdateMailingListPreferenceFormProps = {
  user: UserDTO
}

export const UpdateMailingListPreferenceForm = ({
  user,
}: UpdateMailingListPreferenceFormProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useMutation(
    mutations.USER(queryClient, user.id),
  )

  const form = useAppForm({
    defaultValues: {
      mailing_list_preference: user.mailing_list_preference,
    },
    onSubmit: ({ value }) => {
      updateUser({
        ...user,
        mailing_list_preference: value.mailing_list_preference,
      })
    },
  })

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        event.stopPropagation()
        await form.handleSubmit()
      }}
      className="flex flex-col items-center gap-4"
    >
      <form.Field name="mailing_list_preference">
        {({ state, name, handleChange }) => (
          <Switch
            name={name}
            label="Weekly Member Emails"
            checked={state.value}
            onCheckedChange={handleChange}
          />
        )}
      </form.Field>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
