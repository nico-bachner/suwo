'use client'

import { useActionState } from 'react'

import { Form } from '@/design_system/form'
import { Select, SelectItem } from '@/design_system/select'
import { Instrument, Profile } from '@/generated/prisma'

import { formAction } from './form_action'

type SelectInstrumentFormProps = Pick<Profile, 'instrument_name'> & {
  instruments: Instrument[]
}

export const SelectInstrumentForm = ({
  instrument_name,
  instruments,
}: SelectInstrumentFormProps) => {
  const [state, action, pending] = useActionState(formAction, {
    data: {
      instrument_name,
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
        defaultValue={state.data.instrument_name ?? undefined}
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
