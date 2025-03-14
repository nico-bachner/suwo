'use client'

import { useActionState } from 'react'

import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
import { SubmitButton } from '@/components/ui/submit_button'
import { Instrument, Member, Table } from '@/lib/db/types'

import { editInstrumentFormAction } from './edit_instrument_form_action'

type EditInstrumentFormProps = {
  instrument: Member['instrument']
  instruments: Table<Instrument>
}

export const EditInstrumentForm = ({
  instrument,
  instruments,
}: EditInstrumentFormProps) => {
  const [state, formAction, pending] = useActionState(
    editInstrumentFormAction,
    {
      data: {
        instrument,
      },
      errors: {
        formErrors: [],
        fieldErrors: {},
      },
    },
  )

  return (
    <form
      id="edit-instrument-form"
      action={formAction}
      className="flex flex-col gap-4"
    >
      <Select
        form="edit-instrument-form"
        name="instrument"
        label="Instrument"
        defaultValue={state.data.instrument ?? undefined}
        placeholder="Select Instrument..."
      >
        {instruments.map(({ name }) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </Select>

      <SubmitButton
        disabled={pending}
        className="flex flex-row items-center justify-center gap-2 self-end"
      >
        Update instrument
      </SubmitButton>
    </form>
  )
}
