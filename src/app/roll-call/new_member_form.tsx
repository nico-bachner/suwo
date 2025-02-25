'use client'

import { useActionState } from 'react'

import { CheckboxInput } from '@/components/ui/checkbox_input'
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
      className="flex w-full max-w-screen-sm flex-col gap-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          errors={state?.errors.fieldErrors.given_name}
          name="given-name"
          label="Given Name"
          autoComplete="given-name"
          required
          className="flex-1"
        />
        <TextInput
          errors={state?.errors.fieldErrors.family_name}
          name="family-name"
          label="Family Name"
          autoComplete="family-name"
          className="flex-1"
        />
      </div>

      <TextInput
        errors={state?.errors.fieldErrors.usu}
        name="usu"
        label="USU Number"
        inputMode="numeric"
      />

      <TextInput
        errors={state?.errors.fieldErrors.email}
        type="email"
        name="email"
        label="Email Address"
      />

      <CheckboxInput
        name="mailing-list"
        label="Sign up for weekly rehearsal updates"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-6 cursor-pointer rounded bg-gray-800 px-4 py-2 transition-colors hover:bg-gray-700"
      >
        Submit
      </button>
    </form>
  )
}
