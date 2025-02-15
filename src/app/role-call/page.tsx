import { Switch } from 'radix-ui'

import { Member, RoleCall, Table } from '@/db'
import { getQueryBuilder } from '@/neon'

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
      <main className="flex flex-col items-center gap-6 p-6">
        <h1 className="font-serif text-4xl font-extrabold">Role Call</h1>
        <p className="text-xl">Please select a year, semester, and week.</p>
        <pre className="rounded-md bg-gray-800 px-4 py-3">
          <code>/role-call?year=2025&semester=1&week=1</code>
        </pre>
      </main>
    )
  }

  const sql = getQueryBuilder()
  const members: Table<Member & RoleCall> =
    await sql`SELECT * FROM members LEFT JOIN role_call ON members.id = role_call.member WHERE year = ${year} AND semester = ${semester} AND week = ${week}`

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <h1 className="font-serif text-4xl font-extrabold">
        Role Call – Week {week}
      </h1>

      <div className="flex w-full max-w-screen-sm flex-col">
        {members.map(({ id, name, present }) => (
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
            <div className="flex flex-1 flex-row items-center justify-between gap-2 px-4">
              <span className="flex-1">{name}</span>

              <span>Not Present</span>
              <Switch.Root
                name="present"
                defaultChecked={present}
                className="flex w-10 flex-row rounded-full border border-gray-500 bg-gray-950 p-1 data-[state=checked]:justify-end"
              >
                <Switch.Thumb className="data-[state=checked]:bg-white500 block h-4 w-4 rounded-full bg-gray-500" />
              </Switch.Root>
              <span>Present</span>
            </div>

            <button type="submit" className="bg-gray-500 px-4 py-2">
              Confirm
            </button>
          </form>
        ))}
      </div>
    </main>
  )
}
