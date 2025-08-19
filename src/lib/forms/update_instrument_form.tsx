'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { Session } from '@/features/auth/session/types'
import { queries, queryKeys } from '@/lib/queries'
import { apiRoutes, queryKeys as legacy_queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { UpdateInstrumentFormInput } from '../validators/form_input_validators/update_instrument_form_input_validator'
import { useAppForm } from './context'

type UpdateInstrumentFormProps = {
  session: Session
}

export const UpdateInstrumentForm = ({
  session,
}: UpdateInstrumentFormProps) => {
  const queryClient = useQueryClient()

  const { data: instruments, isPending: isInstrumentsPending } = useQuery(
    queries.INSTRUMENTS(),
  )
  const { data: userInstruments } = useQuery({
    ...queries.USER_INSTRUMENTS(session.user_id),
    enabled: Boolean(session),
  })

  const defaultValues: UpdateInstrumentFormInput = {
    instrument_ids: userInstruments?.map(({ id }) => id) || [],
  }

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.USER_INSTRUMENTS(session.user_id), {
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
            queryKey: legacy_queryKeys.USER_INSTRUMENTS(session.user_id),
          })
          await queryClient.invalidateQueries({
            queryKey: legacy_queryKeys.USER_INSTRUMENTS(session.user_id),
          })
          await queryClient.invalidateQueries({
            queryKey: queryKeys.PROFILE(session.user_id),
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
          <div className="grid grid-cols-2 gap-2 @lg:grid-cols-3">
            {isInstrumentsPending
              ? Array.from({ length: 30 }, (_, index) => (
                  <Button key={index} variant="secondary">
                    Loading...
                  </Button>
                ))
              : instruments?.map((instrument) => (
                  <Button
                    key={instrument.id}
                    variant={
                      state.value.includes(instrument.id)
                        ? 'success'
                        : 'secondary'
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

      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  )
}
