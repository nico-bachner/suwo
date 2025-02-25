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

  const roll_call: Table<RollCall> = await sql`
    SELECT present 
    FROM roll_call 
    WHERE year = ${year} 
    AND semester = ${semester} 
    AND week = ${week} 
    AND member = ${id}
  `

  return (
    <form
      key={id}
      action={async () => {
        'use server'

        const sql = getQueryBuilder()

        const roll_call: Table<RollCall> = await sql`
          SELECT * FROM roll_call 
          WHERE year = ${year} 
          AND semester = ${semester} 
          AND week = ${week} 
          AND member = ${id}
        `

        if (roll_call.length > 0) {
          await sql`
            UPDATE roll_call
            SET present = ${roll_call[0]?.present ? false : true}
            WHERE year = ${year} AND semester = ${semester} AND week = ${week} AND member = ${id}
          `

          revalidatePath('/roll-call')
        } else {
          await sql`
            INSERT INTO roll_call
            VALUES (${year}, ${semester}, ${week}, ${id}, ${true})
          `
          revalidatePath('/roll-call')
        }
      }}
      className="flex flex-row items-center odd:bg-gray-800"
    >
      <div className="flex flex-1 flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row">
        <span className="flex flex-row items-center gap-2">
          {given_name} {family_name}
          {roll_call[0]?.present ? (
            <CheckIcon className="h-5 w-5 stroke-green-300" />
          ) : null}
        </span>
      </div>
      {!roll_call[0]?.present && (
        <button type="submit" className="cursor-pointer px-4 py-2">
          <PlusIcon className="h-5 w-5 stroke-gray-300" />
        </button>
      )}
    </form>
  )
}
