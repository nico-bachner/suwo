import { revalidatePath } from 'next/cache'

import { getQueryBuilder } from '@/lib/db/query'
import { RollCall } from '@/lib/db/types'

export const createRollCallEntry = async ({
  year,
  semester,
  week,
  member,
}: RollCall) => {
  const sql = getQueryBuilder()

  if (semester == 'B') {
    throw new Error('Cannot use roll call during the break')
  }

  await sql`
    INSERT INTO roll_call (
      year,
      semester,
      week,
      member
    )
    VALUES (
      ${year},
      ${semester},
      ${week},
      ${member}
    )
  `

  revalidatePath('/roll-call')
}
