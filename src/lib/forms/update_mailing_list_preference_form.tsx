'use client'

import { useQuery } from '@tanstack/react-query'

import { Switch } from '@/design_system/switch'
import { queries } from '@/lib/queries'
import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { mailingListRecipientQueryKey } from '../queries/mailing_list_recipient_query'
import {
  UpdateMailingListPreferenceFormInput,
  UpdateMailingListPreferenceFormInputValidator,
} from '../validators/form_input_validators/update_mailing_list_preference_form_input_validator'
import { MailingListRecipient } from '../validators/mailing_list_recipient'
import { useAppForm } from './context'

export const UpdateMailingListPreferenceForm = ({
  user_id,
}: Pick<MailingListRecipient, 'user_id'>) => {
  const { data: mailingListRecipient } = useQuery(
    queries.MAILING_LIST_RECIPIENT(user_id),
  )

  const defaultValues: UpdateMailingListPreferenceFormInput = {
    mailing_list_preference: Boolean(mailingListRecipient),
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: UpdateMailingListPreferenceFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(
          createURL({
            path: ['api', ...mailingListRecipientQueryKey(user_id)],
          }),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
          },
        ),
      )

      switch (response.status) {
        case StatusCode.BadRequest:
          // eslint-disable-next-line no-alert, no-undef
          alert(`${response.error}\n\nPlease try again`)
          break
        case StatusCode.OK:
          // eslint-disable-next-line no-alert, no-undef
          alert('Successfully updated mailing list preference')
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
