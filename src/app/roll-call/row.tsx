import { Switch } from 'radix-ui'

import { Submit } from '@/components/client/submit'
import { Member, RollCall, Table, Week } from '@/db'
import { getQueryBuilder } from '@/neon'

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
          await sql`SELECT member FROM roll_call WHERE year = ${year} AND semester = ${semester} AND week = ${week} and member = ${id}`

        if (roll_call.length > 0) {
          console.log('updating')
          await sql`
                  UPDATE roll_call
                  SET present = ${formData.get('present') == 'on'}
                  WHERE year = ${year} AND semester = ${semester} AND week = ${week} AND member = ${id}
                `
        } else {
          console.log('inserting')
          await sql`INSERT INTO roll_call VALUES (${year}, ${semester}, ${week}, ${id}, ${formData.get('present') == 'on'})`
        }
      }}
      className="flex flex-row odd:bg-gray-800"
    >
      <div className="flex flex-1 flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row">
        <span className="flex-1">
          {given_name} {family_name}
        </span>

        <div className="flex flex-row items-center gap-2">
          <span>Not Present</span>
          <Switch.Root
            name="present"
            defaultChecked={roll_call[0]?.present ?? false}
            className="flex w-10 flex-row rounded-full border border-gray-500 bg-gray-950 p-1 data-[state=checked]:justify-end"
          >
            <Switch.Thumb className="data-[state=checked]:bg-white500 block h-4 w-4 rounded-full bg-gray-500" />
          </Switch.Root>
          <span>Present</span>
        </div>
      </div>

      <Submit className="bg-gray-500 px-4 py-2" />
    </form>
  )
}
