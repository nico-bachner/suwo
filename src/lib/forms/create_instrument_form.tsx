'use client'

import { useQueryClient } from '@tanstack/react-query'

import { apiRoutes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'
import {
  CreateInstrumentFormInput,
  CreateInstrumentFormInputValidator,
} from '../validators/form_input_validators/create_instrument_form_input_validator'
import { useAppForm } from './context'

export const CreateInstrumentForm = () => {
  const queryClient = useQueryClient()

  const defaultValues: CreateInstrumentFormInput = {
    instrument_name: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: CreateInstrumentFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.CREATE_INSTRUMENT(), {
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
        case StatusCode.Created:
          await queryClient.invalidateQueries({
            queryKey: queryKeys.INSTRUMENTS(),
          })
          form.reset()
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
      <form.AppField name="instrument_name">
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
