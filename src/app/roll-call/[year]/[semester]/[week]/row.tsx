import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'
import { revalidatePath } from 'next/cache'

import { getQueryBuilder } from '@/db/query'
import { Member, RollCall } from '@/db/types'

type RowProps = Member & RollCall & { present?: boolean }

export const Row = async ({
  year,
  semester,
  week,
  id,
  family_name,
  given_name,
  present,
}: RowProps) => (
  <form
    key={id}
    action={async () => {
      'use server'

      const sql = getQueryBuilder()

      await sql`
        INSERT INTO roll_call
        VALUES (${year}, ${semester}, ${week}, ${id}, true)
      `

      revalidatePath('/roll-call')
    }}
    className="flex flex-row items-center odd:bg-gray-800"
  >
    <p className="flex-1 px-4 py-2">
      {given_name} {family_name}
    </p>

    {present ? (
      <CheckIcon className="box-content h-5 w-5 stroke-green-300 px-4 py-2" />
    ) : (
      <button
        type="submit"
        className="cursor-pointer px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
      >
        <PlusIcon className="h-5 w-5 stroke-gray-300" />
      </button>
    )}
  </form>
)
