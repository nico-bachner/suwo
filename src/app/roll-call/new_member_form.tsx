'use client'

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useActionState } from 'react'

import { CheckboxInput } from '@/components/ui/checkbox_input'
import { SubmitButton } from '@/components/ui/submit_button'
import { TextInput } from '@/components/ui/text_input'

import { createNewMember } from './create_new_member'

export const NewMemberForm = () => {
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
        placeholder='e.g. "1234567"'
        className="sm:col-span-2"
      />

      <div className="flex flex-col gap-4 sm:col-span-2">
        <TextInput
          errors={state?.errors.fieldErrors.email}
          type="email"
          name="email"
          label="Email Address"
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
        Add to members list
      </SubmitButton>
    </form>
  )
}
