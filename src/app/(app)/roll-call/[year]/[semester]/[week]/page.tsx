import { redirect } from 'next/navigation'
import { z } from 'zod'

import { LINKS } from '@/config'
import { WeeklyAttendance } from '@/features/roll_call/weekly_attendance'
import { $Enums, Attendance } from '@/generated/prisma'
import { NextParams } from '@/lib/next/types'
import prisma from '@/lib/prisma'
import { isValidWeek } from '@/lib/usyd/is_valid_week'

type PageProps = {
  params: NextParams<Pick<Attendance, 'year' | 'semester' | 'week'>>
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
  const { data: semester, success } = z
    .nativeEnum($Enums.Semester)
    .safeParse(parseInt(decodeURIComponent(semesterParam), 10))
  const week = parseInt(decodeURIComponent(weekParam), 10)

  if (!success || !isValidWeek(week)) {
    redirect(LINKS.ROLL_CALL.href)
  }

  const profiles = await prisma.profile.findMany()
  const attendances = await prisma.attendance.findMany({
    where: {
      year,
      semester,
      week,
    },
  })

  return (
    <WeeklyAttendance
      year={year}
      semester={semester}
      week={week}
      profiles={profiles}
      attendances={attendances}
    />
  )
}
