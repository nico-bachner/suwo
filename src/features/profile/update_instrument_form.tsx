'use client'

import { useForm } from '@tanstack/react-form'

import { Button } from '@/design_system/button'
import { Select, SelectItem } from '@/design_system/select'
import { Spinner } from '@/design_system/spinner'
import { Instrument } from '@/generated/prisma'
import { routes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

type RegisterFormProps = {
  instruments: Instrument[]
}

export const UpdateInstrumentForm = ({ instruments }: RegisterFormProps) => {
  const form = useForm({
    defaultValues: {
      instrument_name: '',
    },
    onSubmit: async ({ value }) => {
      const response = await fetch(routes.API_UPDATE_INSTRUMENT, {
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
      <form.Field name="instrument_name">
        {({ state, name, handleChange }) => (
          <Select
            name={name}
            value={state.value}
            label="Instrument"
            onValueChange={handleChange}
            placeholder="Select Instrument..."
          >
            {instruments.map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </Select>
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
