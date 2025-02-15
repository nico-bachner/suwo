import { Switch } from 'radix-ui'

import { RoleCall, Table } from '@/db'
import { getQueryBuilder } from '@/neon'

type FormProps = {
  year: number
  semester: number
  week: number
  id?: number
  name?: string
}

export const Form = async ({ year, semester, week, id, name }: FormProps) => {
  const sql = getQueryBuilder()
  const role_call: Table<RoleCall> =
    await sql`SELECT present FROM role_call WHERE year = ${year} AND semester = ${semester} AND week = ${week} and member = ${id}`

  return (
    <form
      key={id}
      action={async (formData: FormData) => {
        'use server'
        const sql = getQueryBuilder()

        const role_call: Table<RoleCall> =
          await sql`SELECT member FROM role_call WHERE year = ${year} AND semester = ${semester} AND week = ${week} and member = ${id}`

        if (role_call.length > 0) {
          console.log('updating')
          await sql`
                  UPDATE role_call
                  SET present = ${formData.get('present') == 'on'}
                  WHERE year = ${year} AND semester = ${semester} AND week = ${week} AND member = ${id}
                `
        } else {
          console.log('inserting')
          await sql`INSERT INTO role_call VALUES (${year}, ${semester}, ${week}, ${id}, ${formData.get('present') == 'on'})`
        }
      }}
      className="flex flex-row odd:bg-gray-800"
    >
      <div className="flex flex-1 flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row">
        <span className="flex-1">{name}</span>

        <div className="flex flex-row gap-2">
          <span>Not Present</span>
          <Switch.Root
            name="present"
            defaultChecked={role_call[0]?.present ?? false}
            className="flex w-10 flex-row rounded-full border border-gray-500 bg-gray-950 p-1 data-[state=checked]:justify-end"
          >
            <Switch.Thumb className="data-[state=checked]:bg-white500 block h-4 w-4 rounded-full bg-gray-500" />
          </Switch.Root>
          <span>Present</span>
        </div>
      </div>

      <button type="submit" className="bg-gray-500 px-4 py-2">
        Confirm
      </button>
    </form>
  )
}
