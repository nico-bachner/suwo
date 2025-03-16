'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { CheckboxInput } from '@/components/ui/checkbox_input'
import { Form } from '@/components/ui/form'
import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
import { TextInput } from '@/components/ui/text_input'
import { Instrument, Table } from '@/lib/db/types'

import { createMemberFormAction } from './create_member_form_action'

type CreateMemberFormProps = {
  instruments: Table<Instrument>
}

export const CreateMemberForm = ({ instruments }: CreateMemberFormProps) => {
  const [state, formAction, pending] = useActionState(createMemberFormAction, {
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
      action={formAction}
      errors={state.errors.formErrors}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          name="given-name"
          label="Given Name"
          autoComplete="given-name"
          placeholder='e.g. "Ambrose"'
          required
          defaultValue={state.data.given_name ?? undefined}
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
        required
        placeholder='e.g. "name@example.com"'
        defaultValue={state.data.email ?? undefined}
        errors={state.errors.fieldErrors.email}
      />

      <TextInput
        type="password"
        name="password"
        label="Password"
        required
        placeholder='e.g. "I<3SUWO25"'
        defaultValue={state.data.password ?? undefined}
        errors={state.errors.fieldErrors.password}
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

      <CheckboxInput
        name="mailing-list"
        label="Sign up for weekly rehearsal updates"
        defaultChecked={state.data.mailing_list}
        className="mt-4 self-center"
      />

      <Button variant="primary" disabled={pending} className="mt-4">
        Join
      </Button>
    </Form>
  )
}
