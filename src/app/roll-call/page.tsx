import { CheckIcon } from '@heroicons/react/24/outline'
import { Checkbox } from 'radix-ui'

import { Submit } from '@/components/client/submit'
import { TextInput } from '@/components/ui/text_input'
import { getQueryBuilder } from '@/neon'
import { Member, Table, Week } from '@/types/db'
import { SearchParams } from '@/types/next'

import { QRCode } from './qr_code'
import { Row } from './row'

type PageProps = {
  searchParams: SearchParams<Week>
}

export default async function Page({ searchParams }: PageProps) {
  const { year, semester, week } = await searchParams

  if (!year || !semester || !week) {
    return (
      <main className="prose">
        <h1>Roll Call</h1>

        <p>Please select a year, semester, and week.</p>

        <pre>
          <code>/roll-call?year=2025&semester=1&week=1</code>
        </pre>
      </main>
    )
  }

  const sql = getQueryBuilder()
  const members: Table<Member> = await sql`SELECT * FROM members`

  return (
    <main className="prose flex w-full flex-col items-center gap-1">
      <h1>Roll Call – Week {week}</h1>

      <QRCode
        value={`${process.env.NEXT_PUBLIC_URL}/roll-call${searchParams.toString()}`}
        className="fixed right-4 bottom-4"
      />

      <div className="flex w-full max-w-screen-sm flex-col">
        {members.map(({ id, ...member }) => (
          <Row
            key={id}
            year={parseInt(year)}
            semester={parseInt(semester)}
            week={parseInt(week)}
            id={id}
            {...member}
          />
        ))}
      </div>

      <h2>Not in the list?</h2>
      <p>Enter your details below:</p>

      <form
        action={async (formData: FormData) => {
          'use server'
          const sql = getQueryBuilder()
          await sql`INSERT INTO members (usu, family_name, given_name, email, mailing_list) VALUES (${formData.get('usu')}, ${formData.get('family-name')}, ${formData.get('given-name')}, ${formData.get('email')}, ${formData.get('mailing-list') == 'on'})`
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
    </main>
  )
}
