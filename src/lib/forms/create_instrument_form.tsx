'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  InstrumentDTO,
  InstrumentDTOValidator,
} from '../dtos/instrument_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

export const CreateInstrumentForm = () => {
  const queryClient = useQueryClient()
  const { mutate: createInstrument } = useMutation(
    mutations.INSTRUMENTS(queryClient),
  )

  const defaultValues: Omit<
    InstrumentDTO,
    'id' | 'players' | 'created_at' | 'updated_at'
  > = {
    name: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: InstrumentDTOValidator.omit({
        id: true,
        players: true,
        created_at: true,
        updated_at: true,
      }),
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
