'use client'

import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import z from 'zod'

import { Button } from '@/design_system/button'
import { Spinner } from '@/design_system/spinner'
import { queries } from '@/lib/queries'
import { apiRoutes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { UpdateInstrumentFormValidator } from '../validators/update_instrument_form_validator'

export const UpdateInstrumentForm = () => {
  const { data: instruments } = useQuery(queries.INSTRUMENTS())
  const { data: myInstruments, error } = useQuery(queries.MY_INSTRUMENTS())

  if (error) {
    throw new Error('Failed to fetch instruments')
  }

  const defaultValues: z.infer<typeof UpdateInstrumentFormValidator> = {
    instrument_ids: myInstruments?.map(({ id }) => id) || [],
  }

  console.log('Default Values:', defaultValues)

  const form = useForm({
    defaultValues,
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
              >
                {instrument.name}
              </Button>
            ))}
          </div>
        )}
      </form.Field>

      <form.Subscribe>
        {({ canSubmit, isSubmitting }) => (
          <Button
            type="submit"
            variant="primary"
            disabled={!canSubmit}
            className="mt-4"
          >
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
