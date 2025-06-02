import { getQueryBuilder } from '@/lib/db/query'
import { Member, RollCall, Table } from '@/lib/db/types'
import { getSemesterNumber } from '@/lib/usyd/get_semester_number'

export const getRollCallEntriesByWeek = async ({
  year,
  semester,
  week,
}: Omit<RollCall, 'member'>) => {
  const sql = getQueryBuilder()

  if (semester == 'B') {
    throw new Error('Cannot use roll call during the break')
  }

  const semesterNumber = getSemesterNumber(semester)

  const rollCallEntries = await sql`
    SELECT
      id,
      given_name,
      family_name,
      instrument,
      present
    FROM
      (
        SELECT
          member,
          TRUE AS present
        FROM roll_call
        WHERE year = ${year}
        AND semester = ${semesterNumber}
        AND week = ${week}
      )
      AS roll_call
    RIGHT JOIN 
      members
    ON 
      roll_call.member = members.id
    ORDER BY
      LOWER(given_name), LOWER(family_name)
      ASC
  `

  return rollCallEntries as Table<Member & { present?: boolean }>
}
