'use client'

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
      className="flex w-full max-w-screen-sm flex-col gap-8"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

        <TextInput
          errors={state?.errors.fieldErrors.usu}
          name="usu"
          label="USU Number"
          inputMode="numeric"
          className="sm:col-span-2"
        />

        <div className="flex flex-col gap-4 sm:col-span-2">
          <TextInput
            errors={state?.errors.fieldErrors.email}
            type="email"
            name="email"
            label="Email Address"
          />

          <CheckboxInput
            name="mailing-list"
            label="Sign up for weekly rehearsal updates"
            defaultChecked={true}
            className="pl-2"
          />
        </div>
      </div>

      <SubmitButton disabled={pending} className="self-end">
        Add yourself to the roll call
      </SubmitButton>
    </form>
  )
}
