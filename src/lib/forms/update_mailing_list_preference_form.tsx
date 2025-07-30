'use client'

import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'

import { SubmitButton } from '@/design_system/submit_button'
import { Switch } from '@/design_system/switch'
import { queries } from '@/lib/queries'
import { apiRoutes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

export const UpdateMailingListPreferenceForm = () => {
  const { data: mailingListPreference } = useQuery(
    queries.MAILING_LIST_PREFERENCE(),
  )

  const form = useForm({
    defaultValues: {
      mailing_list_preference: mailingListPreference,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.MAILING_LIST_PREFERENCE(), {
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
      className="flex flex-col gap-1"
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

      <form.Subscribe>
        {({ canSubmit, isSubmitting }) => (
          <SubmitButton canSubmit={canSubmit} isSubmitting={isSubmitting} />
        )}
      </form.Subscribe>
    </form>
  )
}
