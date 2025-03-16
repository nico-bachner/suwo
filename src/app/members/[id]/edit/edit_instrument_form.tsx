'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
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
    <Form
      id="edit-instrument-form"
      action={formAction}
      errors={state.errors.formErrors}
      pending={pending}
      message="Update Instrument"
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
    </Form>
  )
}
