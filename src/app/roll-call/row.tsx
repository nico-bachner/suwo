import { CheckIcon } from '@heroicons/react/24/outline'

import { Submit } from '@/components/client/submit'
import { getQueryBuilder } from '@/neon'
import { Member, RollCall, Table, Week } from '@/types/db'

export const Row = async ({
  year,
  semester,
  week,
  id,
  family_name,
  given_name,
}: Member & Week) => {
  const sql = getQueryBuilder()
  const roll_call: Table<RollCall> =
    await sql`SELECT present FROM roll_call WHERE year = ${year} AND semester = ${semester} AND week = ${week} and member = ${id}`

  return (
    <form
      key={id}
      action={async (formData: FormData) => {
        'use server'
        const sql = getQueryBuilder()

        const roll_call: Table<RollCall> =
          await sql`SELECT * FROM roll_call WHERE year = ${year} AND semester = ${semester} AND week = ${week} and member = ${id}`

        if (roll_call.length > 0) {
          console.log('updating')
          await sql`
                  UPDATE roll_call
                  SET present = ${roll_call[0]?.present ? false : true}
                  WHERE year = ${year} AND semester = ${semester} AND week = ${week} AND member = ${id}
                `
        } else {
          console.log('inserting')
          await sql`INSERT INTO roll_call VALUES (${year}, ${semester}, ${week}, ${id}, ${true})`
        }
      }}
      className="flex flex-row odd:bg-gray-800"
    >
      <div className="flex flex-1 flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row">
        <span className="flex flex-row items-center gap-2">
          {given_name} {family_name}
          {roll_call[0]?.present ? (
            <CheckIcon className="h-5 w-5 stroke-gray-300" />
          ) : null}
        </span>
      </div>

      <Submit
        content={roll_call[0]?.present ? 'Mark as absent' : 'Mark as present'}
        className="min-w-40 cursor-pointer bg-gray-500 px-4 py-2"
      />
    </form>
  )
}
