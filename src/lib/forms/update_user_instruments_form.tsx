'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { queries } from '@/lib/queries'

import { mutations } from '../mutations'
import { UserInstrument } from '../validators/user_instrument_validator'
import { useAppForm } from './context'

export const UpdateUserInstrumentsForm = ({
  user_id,
}: Pick<UserInstrument, 'user_id'>) => {
  const queryClient = useQueryClient()
  const { data: instruments, isPending: isInstrumentsPending } = useQuery(
    queries.INSTRUMENTS(),
  )
  const { data: userInstruments } = useQuery({
    ...queries.USER_INSTRUMENTS(user_id),
  })
  const { mutate: updateUserInstruments } = useMutation(
    mutations.USER_INSTRUMENTS(queryClient, user_id),
  )

  const form = useAppForm({
    defaultValues: {
      instrument_ids: userInstruments || [],
    },
    onSubmit: ({ value }) => {
      updateUserInstruments(value.instrument_ids)
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
