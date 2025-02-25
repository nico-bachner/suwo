import { CheckIcon } from '@heroicons/react/24/outline'
import { revalidatePath } from 'next/cache'
import { Checkbox } from 'radix-ui'

import { Submit } from '@/components/client/submit'
import { TextInput } from '@/components/ui/text_input'
import { getQueryBuilder } from '@/neon'

export const NewMemberForm = () => (
  <form
    action={async (formData: FormData) => {
      'use server'
      const sql = getQueryBuilder()
      await sql`INSERT INTO members (usu, family_name, given_name, email, mailing_list) VALUES (${formData.get('usu')}, ${formData.get('family-name')}, ${formData.get('given-name')}, ${formData.get('email')}, ${formData.get('mailing-list') == 'on'})`

      revalidatePath('/roll-call')
    }}
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

    <Submit className="mt-6 cursor-pointer rounded bg-gray-800 px-4 py-2 transition-colors hover:bg-gray-700" />
  </form>
)
