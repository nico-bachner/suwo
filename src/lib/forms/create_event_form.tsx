'use client'

import { useQueryClient } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'
import { Event, EventType, EventValidator } from '../validators/event_validator'
import { useAppForm } from './context'

export const CreateEventForm = () => {
  const queryClient = useQueryClient()

  const defaultValues: Omit<Event, 'id' | 'created_at' | 'updated_at'> = {
    name: '',
    starts_at: new Date().toISOString(),
    ends_at: new Date(
      Date.now() + 3 * 60 * 60 * 1000, // 3 hours later
    ).toISOString(),
    location: '',
    notes: '',
    type: EventType.Rehearsal,
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: EventValidator.omit({
        id: true,
        created_at: true,
        updated_at: true,
      }),
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(createURL({ path: ['api', ...queryKeys.EVENTS()] }), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        }),
      )

      switch (response.status) {
        case StatusCode.OK:
        case StatusCode.Created:
          await queryClient.invalidateQueries({
            queryKey: queryKeys.EVENTS(),
          })
          form.reset()
          break
        case StatusCode.NoContent:
          break
        default:
          // eslint-disable-next-line no-alert, no-undef
          alert(response.error)
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
      className="flex flex-col gap-4"
    >
      <form.AppField name="name">
        {(field) => (
          <field.Text label="Event Name" placeholder="e.g. Week 7 Rehearsal" />
        )}
      </form.AppField>

      <form.AppField name="starts_at">
        {(field) => <field.DateTime label="Starts At" />}
      </form.AppField>

      <form.AppField name="ends_at">
        {(field) => <field.DateTime label="Ends At (optional)" />}
      </form.AppField>

      <form.AppField name="location">
        {(field) => (
          <field.Text label="Location" placeholder="e.g. Gillespie Hall" />
        )}
      </form.AppField>

      <form.AppField name="notes">
        {(field) => (
          <field.Text
            label="Notes"
            placeholder="e.g. Bring your own music stands"
          />
        )}
      </form.AppField>

      <form.AppField name="type">
        {(field) => (
          <field.Text label="Type" placeholder="e.g. Rehearsal, Concert" />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
