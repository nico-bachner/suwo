'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Switch } from '@/design_system/switch'
import { queries } from '@/lib/queries'

import { mutations } from '../mutations'
import { MailingListRecipientDTO } from '../validators/dtos/mailing_list_recipient_dto_validator'
import { useAppForm } from './context'

export const UpdateMailingListPreferenceForm = ({
  user_id,
}: Pick<MailingListRecipientDTO, 'user_id'>) => {
  const queryClient = useQueryClient()
  const { data: mailingListRecipient } = useQuery(
    queries.MAILING_LIST_RECIPIENT(user_id),
  )
  const { mutate: updateMailingListPreference } = useMutation(
    mutations.MAILING_LIST_RECIPIENT(queryClient, user_id),
  )

  const form = useAppForm({
    defaultValues: {
      mailing_list_preference: Boolean(mailingListRecipient),
    },
    onSubmit: ({ value }) => {
      updateMailingListPreference(value.mailing_list_preference)
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
