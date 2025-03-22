'use client'

import { useActionState } from 'react'

import { CheckboxInput } from '@/components/ui/checkbox_input'
import { Form } from '@/components/ui/form'
import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
import { TextInput } from '@/components/ui/text_input'
import { Instrument, Table } from '@/lib/db/types'

import { formAction } from './form_action'

type CreateMemberFormProps = {
  instruments: Table<Instrument>
}

export const CreateMemberForm = ({ instruments }: CreateMemberFormProps) => {
  const [state, action, pending] = useActionState(formAction, {
    given_name: {
      success: true,
      data: '',
    },
    family_name: {
      success: true,
      data: '',
    },
    email: {
      success: true,
      data: '',
    },
    password: {
      success: true,
      data: '',
    },
    usu: {
      success: true,
      data: undefined,
    },
    instrument: {
      success: true,
      data: '',
    },
    mailing_list: {
      success: true,
      data: false,
    },
  })

  return (
    <Form
      id="new-member-form"
      action={action}
      errors={undefined}
      pending={pending}
      message="Join"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          name="given-name"
          label="Given Name"
          autoComplete="given-name"
          placeholder='e.g. "Ambrose"'
          required
          defaultValue={state.given_name.data}
          error={state.given_name.error}
          className="flex-1"
        />

        <TextInput
          name="family-name"
          label="Family Name"
          autoComplete="family-name"
          placeholder='e.g. "Phelps"'
          defaultValue={state.family_name?.data}
          error={state.family_name?.error}
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
        defaultValue={state.email.data}
        error={state.email.error}
      />

      <TextInput
        type="password"
        name="password"
        label="Password"
        autoComplete="new-password"
        required
        placeholder='e.g. "I<3SUWO25"'
        defaultValue={state.password?.data}
        error={state.password?.error}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          name="usu"
          label="USU Number"
          inputMode="numeric"
          placeholder='e.g. "1234567"'
          defaultValue={state.usu?.data}
          error={state.usu?.error}
          className="flex-1"
        />

        <Select
          form="new-member-form"
          name="instrument"
          label="Instrument"
          defaultValue={state.instrument?.data}
          error={state.instrument?.error}
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
        defaultChecked={state.mailing_list.data}
        className="mt-4 self-center"
      />
    </Form>
  )
}
