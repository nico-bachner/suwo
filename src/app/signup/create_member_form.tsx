'use client'

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useActionState } from 'react'

import { CheckboxInput } from '@/components/ui/checkbox_input'
import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
import { SubmitButton } from '@/components/ui/submit_button'
import { TextInput } from '@/components/ui/text_input'
import { Instrument, Table } from '@/lib/db/types'

import { createMemberFormAction } from './create_member_form_action'

type CreateMemberFormProps = {
  instruments: Table<Instrument>
}

export const CreateMemberForm = ({ instruments }: CreateMemberFormProps) => {
  const [state, formAction, pending] = useActionState(createMemberFormAction, {
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  })

  return (
    <form
      id="new-member-form"
      action={formAction}
      className="flex w-full max-w-screen-sm flex-col gap-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          errors={state?.errors.fieldErrors.given_name}
          name="given-name"
          label="Given Name"
          autoComplete="given-name"
          placeholder='e.g. "Ambrose"'
          required
          className="flex-1"
        />

        <TextInput
          errors={state?.errors.fieldErrors.family_name}
          name="family-name"
          label="Family Name"
          autoComplete="family-name"
          placeholder='e.g. "Phelps"'
          className="flex-1"
        />
      </div>

      <TextInput
        errors={state?.errors.fieldErrors.email}
        type="email"
        name="email"
        label="Email Address"
        required
        placeholder='e.g. "name@example.com"'
      />

      <TextInput
        errors={state?.errors.fieldErrors.password}
        type="password"
        name="password"
        label="Password"
        required
        placeholder='e.g. "I<3SUWO25"'
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          errors={state?.errors.fieldErrors.usu}
          name="usu"
          label="USU Number"
          inputMode="numeric"
          placeholder='e.g. "1234567"'
          className="flex-1"
        />

        <Select
          form="new-member-form"
          name="instrument"
          label="Instrument"
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
        defaultChecked={true}
        className="mt-4 self-center"
      />

      <SubmitButton
        disabled={pending}
        className="mt-4 flex flex-row items-center justify-center gap-2 sm:col-start-2"
      >
        <ArrowUpTrayIcon className="h-5 w-5 stroke-gray-300 stroke-2" />
        <span className="font-bold">Add member</span>
      </SubmitButton>
    </form>
  )
}
