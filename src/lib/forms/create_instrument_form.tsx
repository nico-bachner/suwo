'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mutations } from '../mutations'
import { useAppForm } from './context'

export const CreateInstrumentForm = () => {
  const queryClient = useQueryClient()
  const { mutate: createInstrument } = useMutation(
    mutations.INSTRUMENTS(queryClient),
  )

  const form = useAppForm({
    defaultValues: {
      name: '',
    },
    onSubmit: ({ value }) => {
      createInstrument(value)
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
          <field.Text label="Instrument Name" placeholder="e.g. Trombone" />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
