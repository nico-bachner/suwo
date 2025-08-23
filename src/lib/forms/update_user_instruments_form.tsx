'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { queries } from '@/lib/queries'

import { UserDTO } from '../dtos/user_dto_validator'
import { mutations } from '../mutations'
import { useAppForm } from './context'

type UpdateUserInstrumentsFormProps = {
  user: UserDTO
}

export const UpdateUserInstrumentsForm = ({
  user,
}: UpdateUserInstrumentsFormProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateUser } = useMutation(
    mutations.USER(queryClient, user.id),
  )
  const { data: instruments, isPending: isInstrumentsPending } = useQuery(
    queries.INSTRUMENTS(),
  )

  const form = useAppForm({
    defaultValues: {
      instruments: user.instruments,
    },
    onSubmit: ({ value }) => {
      updateUser(value)
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
      <form.Field name="instruments">
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
