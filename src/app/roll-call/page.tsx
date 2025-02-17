import { CheckIcon } from '@heroicons/react/24/outline'
import { Checkbox } from 'radix-ui'

import { Submit } from '@/components/client/submit'
import { Member, Table } from '@/db'
import { getQueryBuilder } from '@/neon'

import { Row } from './row'

type PageProps = {
  searchParams: Promise<{
    year?: string
    semester?: string
    week?: string
  }>
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
    <main className="prose flex w-full flex-col items-center">
      <h1>Roll Call – Week {week}</h1>

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
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="given-name" className="text-sm text-gray-300">
              Given Name
            </label>
            <input
              type="text"
              name="given-name"
              id="given-name"
              autoComplete="given-name"
              className="rounded border border-gray-500 bg-gray-900 px-2 py-1"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="family-name" className="text-sm text-gray-300">
              Family Name
            </label>
            <input
              type="text"
              name="family-name"
              id="family-name"
              autoComplete="family-name"
              className="rounded border border-gray-500 bg-gray-900 px-2 py-1"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="usu" className="text-sm text-gray-300">
            USU Number
          </label>
          <input
            id="usu"
            name="usu"
            type="text"
            inputMode="numeric"
            className="rounded border border-gray-500 bg-gray-900 px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="rounded border border-gray-500 bg-gray-900 px-2 py-1"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <label htmlFor="mailing-list" className="text-sm text-gray-300">
            Sign up for weekly rehearsal updates
          </label>
          <Checkbox.Root
            name="mailing-list"
            id="mailing-list"
            className="flex h-6 w-6 items-center justify-center rounded border border-gray-500 bg-gray-900"
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
