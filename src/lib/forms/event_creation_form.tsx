'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventInput, EventInputValidator } from '../dtos/event_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

export const EventCreationForm = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(mutations.EVENTS(queryClient))

  const defaultValues: EventInput = {
    name: '',
    starts_at: '2025-02-27T17:00',
    ends_at: '',
    location: '',
    notes: '',
    type: 'Rehearsal',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: EventInputValidator,
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
