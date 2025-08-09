'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { queries } from '@/lib/queries'
import { apiRoutes, queryKeys } from '@/routes'
import { cn } from '@/utils/cn'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  UpdateInstrumentFormInput,
  UpdateInstrumentFormInputValidator,
} from '../validators/form_input_validators/update_instrument_form_input_validator'
import { useAppForm } from './context'

export const UpdateInstrumentForm = () => {
  const queryClient = useQueryClient()

  const { data: session } = useQuery(queries.SESSION())
  const { data: instruments, isPending: isInstrumentsPending } = useQuery(
    queries.INSTRUMENTS(),
  )
  const { data: userInstruments } = useQuery({
    // eslint-disable-next-line typescript/no-non-null-assertion
    ...queries.USER_INSTRUMENTS(session!.user_id),
    enabled: Boolean(session),
  })

  const defaultValues: UpdateInstrumentFormInput = {
    instrument_ids: userInstruments?.map(({ id }) => id) || [],
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: UpdateInstrumentFormInputValidator,
    },
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        // eslint-disable-next-line typescript/no-non-null-assertion
        await fetch(apiRoutes.USER_INSTRUMENTS(session!.user_id), {
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
            // eslint-disable-next-line typescript/no-non-null-assertion
            queryKey: queryKeys.USER_INSTRUMENTS(session!.user_id),
          })
          await queryClient.invalidateQueries({
            // eslint-disable-next-line typescript/no-non-null-assertion
            queryKey: queryKeys.USER_INSTRUMENTS(session!.user_id),
          })
          await queryClient.invalidateQueries({
            // eslint-disable-next-line typescript/no-non-null-assertion
            queryKey: queryKeys.PROFILE(session!),
          })

          // eslint-disable-next-line no-alert, no-undef
          alert('Instrument(s) updated successfully!')
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
      className="@container flex flex-col gap-4"
    >
      <form.Field name="instrument_ids">
        {({ state, handleChange }) => (
          <div className="grid grid-cols-2 gap-4 @xl:grid-cols-3">
            {isInstrumentsPending
              ? Array.from({ length: 30 }, (_, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="bg-neutral-6"
                  >
                    Loading...
                  </Button>
                ))
              : instruments?.map((instrument) => (
                  <Button
                    key={instrument.id}
                    variant={
                      state.value.includes(instrument.id)
                        ? 'primary'
                        : 'secondary'
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
                        : 'bg-neutral-6',
                    )}
                  >
                    {instrument.name}
                  </Button>
                ))}
          </div>
        )}
      </form.Field>

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
