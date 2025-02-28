import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'
import { revalidatePath } from 'next/cache'

import { getQueryBuilder } from '@/db/query'
import { Member, RollCall, Table, Week } from '@/db/types'

export const Row = async ({
  year,
  semester,
  week,
  id,
  family_name,
  given_name,
}: Member & Week) => {
  const sql = getQueryBuilder()

  const roll_call: Table<Pick<RollCall, 'present'>> = await sql`
    SELECT present 
    FROM roll_call 
    WHERE year = ${year} 
    AND semester = ${semester} 
    AND week = ${week} 
    AND member = ${id}
  `

  const existsEntryInRoleCall = roll_call[0] != undefined
  const isPresent = roll_call[0]?.present ?? false

  return (
    <form
      key={id}
      action={async () => {
        'use server'

        const sql = getQueryBuilder()

        if (existsEntryInRoleCall) {
          await sql`
            UPDATE roll_call
            SET present = true
            WHERE year = ${year} AND semester = ${semester} AND week = ${week} AND member = ${id}
          `

          revalidatePath('/roll-call')
        } else {
          await sql`
            INSERT INTO roll_call
            VALUES (${year}, ${semester}, ${week}, ${id}, true)
          `
          revalidatePath('/roll-call')
        }
      }}
      className="flex flex-row items-center odd:bg-gray-800"
    >
      <p className="flex-1 px-4 py-2">
        {given_name} {family_name}
      </p>

      {isPresent ? (
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
}
