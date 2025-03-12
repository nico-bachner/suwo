import Link from 'next/link'
import { redirect } from 'next/navigation'

import {
  getCurrentSemester,
  getCurrentWeek,
  getCurrentYear,
} from './get_current_week'

const MAX_WEEK = 13

export const revalidate = 86400 // 1 day

export default async function Page() {
  const year = getCurrentYear()
  const semester = getCurrentSemester()
  const week = await getCurrentWeek()

  if (semester >= 1 && semester <= 2 && week >= 1 && week <= MAX_WEEK) {
    return redirect(`/roll-call/${year}/${semester}/${week}`)
  }

  return (
    <main className="prose">
      <h1>Roll Call</h1>

      <p>Please select a week:</p>

      <div className="mx-auto flex w-full max-w-screen-sm flex-row flex-wrap gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
          <Link
            key={i}
            href={`/roll-call?year=${year}&semester=${semester}&week=${i}`}
            className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-900 text-xl hover:bg-gray-800"
          >
            {i}
          </Link>
        ))}
      </div>
    </main>
  )
}
