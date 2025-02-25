'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import { Checkbox } from 'radix-ui'
import { useActionState } from 'react'

import { TextInput } from '@/components/ui/text_input'

import { createNewMember } from './create_new_member'

export const NewMemberForm = () => {
  const [state, formAction, pending] = useActionState(createNewMember, {
    errors: [],
  })

  return (
    <form
      action={formAction}
      className="flex w-full max-w-screen-sm flex-col gap-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <TextInput
          name="given-name"
          label="Given Name"
          autoComplete="given-name"
          required
          className="flex-1"
        />
        <TextInput
          name="family-name"
          label="Family Name"
          autoComplete="family-name"
          className="flex-1"
        />
      </div>

      <TextInput name="usu" label="USU Number" inputMode="numeric" />

      <TextInput type="email" name="email" label="Email Address" />

      <div className="flex flex-row items-center justify-center gap-4">
        <label htmlFor="mailing-list" className="text-sm text-gray-300">
          Sign up for weekly rehearsal updates
        </label>

        <Checkbox.Root
          name="mailing-list"
          id="mailing-list"
          className="flex h-5 w-5 items-center justify-center rounded border border-gray-500 bg-gray-900"
        >
          <Checkbox.Indicator>
            <CheckIcon className="h-5 w-5 stroke-gray-300" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>

      {state?.errors.map(({ message }) => <p key={message}>{message}</p>)}

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
