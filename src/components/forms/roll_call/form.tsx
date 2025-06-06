'use client'

import { useActionState } from 'react'

import { Checkbox } from '@/design_system/checkbox'
import { Form } from '@/design_system/form'
import { Select, SelectItem } from '@/design_system/select'
import { TextInput } from '@/design_system/text_input'
import { Instrument, Table } from '@/lib/db/types'

import { formAction } from './action'

type CreateMemberFromRollCallFormProps = {
  instruments: Table<Instrument>
}

export const CreateMemberFromRollCallForm = ({
  instruments,
}: CreateMemberFromRollCallFormProps) => {
  const [state, action, pending] = useActionState(formAction, {
    data: {
      given_name: '',
      family_name: null,
      email: '',
      password: '',
      usu: null,
      instrument: null,
      mailing_list: true,
    },
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  })

  return (
    <Form
      id="new-member-form"
      action={action}
      errors={state.errors.formErrors}
      pending={pending}
      message="Add to Roll Call"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          name="given-name"
          label="Given Name"
          autoComplete="given-name"
          placeholder='e.g. "Ambrose"'
          required
          defaultValue={state.data.given_name}
          errors={state.errors.fieldErrors.given_name}
          className="flex-1"
        />

        <TextInput
          name="family-name"
          label="Family Name"
          autoComplete="family-name"
          placeholder='e.g. "Phelps"'
          defaultValue={state.data.family_name ?? undefined}
          errors={state.errors.fieldErrors.family_name}
          className="flex-1"
        />
      </div>

      <TextInput
        type="email"
        name="email"
        label="Email Address"
        autoComplete="new-email"
        required
        placeholder='e.g. "name@example.com"'
        defaultValue={state.data.email}
        errors={state.errors.fieldErrors.email}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          name="usu"
          label="USU Number"
          inputMode="numeric"
          placeholder='e.g. "1234567"'
          defaultValue={state.data.usu ?? undefined}
          errors={state.errors.fieldErrors.usu}
          className="flex-1"
        />

        <Select
          form="new-member-form"
          name="instrument"
          label="Instrument"
          defaultValue={state.data.instrument ?? undefined}
          errors={state.errors.fieldErrors.instrument}
          placeholder="Select Instrument..."
        >
          {instruments.map(({ name }) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Checkbox
        name="mailing-list"
        label="Sign up for weekly rehearsal updates"
        defaultChecked={state.data.mailing_list}
        className="mt-4 self-center"
      />
    </Form>
  )
}
