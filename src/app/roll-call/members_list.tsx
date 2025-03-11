import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'
import { revalidatePath } from 'next/cache'

import { getQueryBuilder } from '@/db/query'
import { Member, RollCall, Table } from '@/db/types'

type MembersListProps = {
  data: Table<RollCall & Member>
  year: number
  semester: number
  week: number
}

export const MembersList = async ({
  data,
  year,
  semester,
  week,
}: MembersListProps) => (
  <div className="flex w-full max-w-screen-sm flex-col">
    {data.map(({ id, given_name, family_name, present, instrument }) => (
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
        <p className="flex flex-1 flex-row gap-2 px-4 py-2 font-bold">
          <span className="text-gray-300">
            {given_name} {family_name}
          </span>
          <span className="text-gray-500">{instrument}</span>
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
    ))}
  </div>
)
