'use client'

import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import z from 'zod'

import { SubmitButton } from '@/design_system/submit_button'
import { TextInput } from '@/design_system/text_input'
import { apiRoutes } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queries } from '../queries'
import { CreateInstrumentFormValidator } from '../validators/create_instrument_form_validator'

export const CreateInstrumentForm = () => {
  const queryClient = useQueryClient()

  const defaultValues: z.infer<typeof CreateInstrumentFormValidator> = {
    instrument_name: '',
  }

  const form = useForm({
    defaultValues,
    validators: {
      onChange: CreateInstrumentFormValidator,
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
          await queryClient.invalidateQueries(queries.INSTRUMENTS())
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
      <form.Field name="instrument_name">
        {({ name, state, handleBlur, handleChange }) => (
          <TextInput
            type="text"
            name={name}
            label="Instrument Name"
            value={state.value}
            placeholder="e.g. Trombone"
            errors={state.meta.errors
              .map((error) => {
                switch (typeof error) {
                  case 'string':
                    return error
                  case 'object':
                    return error.message
                  default:
                    return null
                }
              })
              .filter((error) => error !== null)}
            onBlur={handleBlur}
            onChange={({ target }) => {
              handleChange(target.value)
            }}
          />
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
