import Link from 'next/link'
import { redirect } from 'next/navigation'

import { MAX_WEEK } from '@/config'
import {
  getCurrentSemester,
  getCurrentWeek,
  getCurrentYear,
} from '@/lib/get_current_week'

// Set cache stale time to 1 day (86400 seconds)
export const revalidate = 86400

export default async function Page() {
  const year = getCurrentYear()
  const semester = getCurrentSemester()
  const week = await getCurrentWeek()

  if (week >= 1 && week <= MAX_WEEK) {
    return redirect(`/roll-call/${year}/${semester}/${week}`)
  }

  // Fallback ui in case the USYD api goes down or changes structure
  return (
    <main className="prose">
      <h1>Roll Call</h1>

      <p>Please select a week:</p>

      <div className="mx-auto flex w-full max-w-screen-sm flex-row flex-wrap gap-1">
        {Array.from({ length: MAX_WEEK }, (_, index) => index + 1).map(
          (week) => (
            <Link
              key={week}
              href={`/roll-call/${year}/${semester}/${week}`}
              className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-900 text-xl hover:bg-gray-800"
            >
              {week}
            </Link>
          ),
        )}
      </div>
    </main>
  )
}
