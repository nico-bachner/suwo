'use client'

import { useForm } from '@tanstack/react-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { SubmitButton } from '@/design_system/submit_button'
import { queries } from '@/lib/queries'
import { apiRoutes } from '@/routes'
import { cn } from '@/utils/cn'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  UpdateInstrumentFormInput,
  UpdateInstrumentFormInputValidator,
} from '../form_input_validators/update_instrument_form_input_validator'

export const UpdateInstrumentForm = () => {
  const queryClient = useQueryClient()

  const { data: instruments } = useQuery(queries.INSTRUMENTS())
  const { data: myInstruments } = useQuery(queries.MY_INSTRUMENTS())

  const defaultValues: UpdateInstrumentFormInput = {
    instrument_ids: myInstruments?.map(({ id }) => id) || [],
  }

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: UpdateInstrumentFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.MY_INSTRUMENTS(), {
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
          await queryClient.invalidateQueries(queries.MY_INSTRUMENTS())
          // eslint-disable-next-line no-alert, no-undef
          alert('Instrument updated successfully!')
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
      <form.Field name="instrument_ids">
        {({ state, handleChange }) => (
          <div className="grid grid-cols-2 gap-4">
            {instruments?.map((instrument) => (
              <Button
                key={instrument.id}
                variant={
                  state.value.includes(instrument.id) ? 'primary' : 'secondary'
                }
                onClick={() => {
                  handleChange((prev) =>
                    prev.includes(instrument.id)
                      ? prev.filter((id) => id !== instrument.id)
                      : [...prev, instrument.id],
                  )
                }}
                className={cn(
                  'grayscale-50',
                  state.value.includes(instrument.id)
                    ? 'bg-positive'
                    : 'bg-negative',
                )}
              >
                {instrument.name}
              </Button>
            ))}
          </div>
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
