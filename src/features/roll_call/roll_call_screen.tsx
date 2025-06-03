import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { MAX_WEEK } from '@/config'
import { getCurrentSemester } from '@/lib/usyd/get_current_semester'
import { getCurrentYear } from '@/lib/usyd/get_current_year'
import { getSemesterNumber } from '@/lib/usyd/get_semester_number'

export const RollCallScreen = () => {
  const currentYear = getCurrentYear()
  const currentSemester = getCurrentSemester()

  return (
    <PageLayout title="Roll Call" className="prose">
      <p className="text-center text-5xl font-bold">Come back next semester!</p>

      <p>
        We are currently on break after our semester{' '}
        {getSemesterNumber(currentSemester)} concert. Come back next semester,
        or review the semester {getSemesterNumber(currentSemester)} roll calls
        linked below.
      </p>

      <div className="mx-auto flex w-full max-w-screen-sm flex-row flex-wrap gap-1">
        {Array.from({ length: MAX_WEEK }, (_, index) => index + 1).map(
          (week) => (
            <Link
              key={week}
              href={`/roll-call/${currentYear.toString()}/${currentSemester}/${week}`}
              className="bg-neutral-4 hover:bg-neutral-3 flex h-16 w-16 items-center justify-center rounded-md text-3xl transition-colors"
            >
              {week}
            </Link>
          ),
        )}
      </div>
    </PageLayout>
  )
}
