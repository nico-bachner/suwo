'use client'

import { useActionState } from 'react'

import { Form } from '@/components/ui/form'
import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
import { Instrument, Member, Table } from '@/lib/db/types'

import { formAction } from './form_action'

type SelectInstrumentFormProps = {
  instrument: Member['instrument']
  instruments: Table<Instrument>
}

export const SelectInstrumentForm = ({
  instrument,
  instruments,
}: SelectInstrumentFormProps) => {
  const [state, action, pending] = useActionState(formAction, {
    data: {
      instrument,
    },
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  })

  return (
    <Form
      id="edit-instrument-form"
      action={action}
      errors={state.errors.formErrors}
      pending={pending}
      message="Update Instrument"
      variant="secondary"
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
