'use client'

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useActionState } from 'react'

import { CheckboxInput } from '@/components/ui/checkbox_input'
import { Select } from '@/components/ui/select/select'
import { SelectItem } from '@/components/ui/select/select_item'
import { SubmitButton } from '@/components/ui/submit_button'
import { TextInput } from '@/components/ui/text_input'
import { Instrument, Table } from '@/db/types'

import { createNewMember } from './create_new_member'

type NewMemberFormProps = {
  instruments: Table<Instrument>
}

export const NewMemberForm = ({ instruments }: NewMemberFormProps) => {
  const [state, formAction, pending] = useActionState(createNewMember, {
    errors: {
      formErrors: [],
      fieldErrors: {},
    },
  })

  return (
    <form
      action={formAction}
      className="grid w-full max-w-screen-sm grid-cols-1 gap-4 sm:grid-cols-2"
    >
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
      <TextInput
        errors={state?.errors.fieldErrors.usu}
        name="usu"
        label="USU Number"
        inputMode="numeric"
        required
        placeholder='e.g. "1234567"'
      />
      <Select
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

      <div className="flex flex-col gap-4 sm:col-span-2">
        <TextInput
          errors={state?.errors.fieldErrors.email}
          type="email"
          name="email"
          label="Email Address"
          required
          placeholder='e.g. "name@example.com"'
        />

        <CheckboxInput
          name="mailing-list"
          label="Sign up for weekly rehearsal updates"
          defaultChecked={true}
          className="pl-2"
        />
      </div>

      <SubmitButton
        disabled={pending}
        className="mt-4 flex flex-row items-center justify-center gap-2 sm:col-start-2"
      >
        <ArrowUpTrayIcon className="h-5 w-5 stroke-gray-300" />
        Add member
      </SubmitButton>
    </form>
  )
}
