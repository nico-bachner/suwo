'use client'

import { useQueryClient } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'
import {
  Instrument,
  InstrumentValidator,
} from '../validators/instrument_validator'
import { useAppForm } from './context'

export const CreateInstrumentForm = () => {
  const queryClient = useQueryClient()

  const defaultValues: Omit<Instrument, 'id' | 'created_at' | 'updated_at'> = {
    name: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: InstrumentValidator.omit({
        id: true,
        created_at: true,
        updated_at: true,
      }),
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(
          createURL({
            path: ['api', ...queryKeys.INSTRUMENTS()],
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
        case StatusCode.OK:
        case StatusCode.Created:
          await queryClient.invalidateQueries({
            queryKey: queryKeys.INSTRUMENTS(),
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
          <field.Text label="Instrument Name" placeholder="e.g. Trombone" />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
