import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PageLayout } from '@/components/server/page_layout'
import { MAX_WEEK } from '@/config'
import { getCurrentSemester } from '@/utils/usyd/get_current_semester'
import { getCurrentWeek } from '@/utils/usyd/get_current_week'
import { getCurrentYear } from '@/utils/usyd/get_current_year'

export default async function Page() {
  const year = getCurrentYear()
  const semester = getCurrentSemester()
  const week = await getCurrentWeek()

  if (week && week >= 1 && week <= MAX_WEEK) {
    return redirect(`/roll-call/${year}/${semester}/${week.toString()}`)
  }

  return (
    <PageLayout title="Roll Call" className="prose">
      <p className="text-center text-5xl font-bold">Come back next semester!</p>

      <p>We are currently on semester break.</p>

      <p>
        If you think this is a mistake, you can manually specify which week it
        is below:
      </p>

      <div className="mx-auto flex w-full max-w-screen-sm flex-row flex-wrap gap-1">
        {Array.from({ length: MAX_WEEK }, (_, index) => index + 1).map(
          (week) => (
            <Link
              key={week}
              href={`/roll-call/${year}/${semester}/${week}`}
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
