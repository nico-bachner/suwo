import { redirect } from 'next/navigation'

import { LINKS, MAX_WEEK } from '@/config'
import { CurrentWeekRollCallScreen } from '@/features/roll_call'
import { getRollCallEntriesByWeek } from '@/lib/db/roll_call_entries/by_week'
import { RollCall } from '@/lib/db/types'
import { NextParams } from '@/lib/next/types'

type PageProps = {
  params: NextParams<Pick<RollCall, 'year' | 'semester' | 'week'>>
}

export default async function Page({ params }: PageProps) {
  const {
    year: yearParam,
    semester: semesterParam,
    week: weekParam,
  } = await params

  if (!yearParam || !semesterParam || !weekParam) {
    redirect(LINKS.ROLL_CALL.href)
  }

  const year = parseInt(decodeURIComponent(yearParam), 10)
  const semester = decodeURIComponent(semesterParam)
  const week = parseInt(decodeURIComponent(weekParam), 10)

  if ((semester != 'S1' && semester != 'S2') || week < 1 || week > MAX_WEEK) {
    redirect(LINKS.ROLL_CALL.href)
  }

  const rollCallEntries = await getRollCallEntriesByWeek({
    year,
    semester,
    week,
  })

  return (
    <CurrentWeekRollCallScreen
      year={year}
      semester={semester}
      week={week}
      rollCallEntries={rollCallEntries}
    />
  )
}
