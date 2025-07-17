import Link from 'next/link'

import { WEEKS } from '@/lib/usyd/config'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

export const RollCallScreen = () => {
  const currentYear = getCurrentYear()
  const currentSemester = getCurrentSemester()

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>Roll Call</h1>

      <p className="text-center text-5xl font-bold">Come back next semester!</p>

      <p>
        We are currently on break after our semester {currentSemester} concert.
        Come back next semester, or review the semester {currentSemester} roll
        calls linked below.
      </p>

      <div className="mx-auto flex w-full max-w-screen-sm flex-row flex-wrap gap-1">
        {Array.from({ length: WEEKS }, (_, index) => index + 1).map((week) => (
          <Link
            key={week}
            href={`/roll-call/${currentYear.toString()}/${currentSemester}/${week}`}
            className="bg-neutral-4 hover:bg-neutral-3 flex h-16 w-16 items-center justify-center rounded-md text-3xl transition-colors"
          >
            {week}
          </Link>
        ))}
      </div>
    </div>
  )
}
