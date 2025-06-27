'use client'

import { useForm } from '@tanstack/react-form'

import { Button } from '@/design_system/button'
import { Spinner } from '@/design_system/spinner'
import { Switch } from '@/design_system/switch'
import { routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

type UpdateMailingListPreferenceFormProps = {
  mailingListPreference: boolean
}

export const UpdateMailingListPreferenceForm = ({
  mailingListPreference,
}: UpdateMailingListPreferenceFormProps) => {
  const form = useForm({
    defaultValues: {
      mailing_list_preference: mailingListPreference,
    },
    onSubmit: async ({ value }) => {
      const response = await fetch(routes.API_UPDATE_MAILING_LIST_PREFERENCE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })

      const jsonResponse = await parseResponse(response)

      switch (jsonResponse.status) {
        case StatusCode.BadRequest:
          // eslint-disable-next-line no-alert, no-undef
          alert(`${jsonResponse.body.error}\n\nPlease try again`)
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
          <Button variant="primary" disabled={!canSubmit} className="mt-4">
            {isSubmitting ? (
              <Spinner className="stroke-neutral-3 h-6 w-6" />
            ) : (
              'Submit'
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
