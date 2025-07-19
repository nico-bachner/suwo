import { redirect } from 'next/navigation'
import z from 'zod'

import { FOUNDING_YEAR } from '@/config'
import { WeeklyAttendance } from '@/features/roll_call/weekly_attendance'
import { $Enums, Attendance } from '@/generated/prisma'
import { NextParams } from '@/lib/next/types'
import prisma from '@/lib/prisma'
import { MAX_WEEK, MIN_WEEK } from '@/lib/usyd/config'
import { routes } from '@/routes'

type PageFileProps = {
  params: NextParams<Pick<Attendance, 'year' | 'semester' | 'week'>>
}

const CurrentWeekValidator = z.object({
  year: z.coerce.number().int().min(FOUNDING_YEAR),
  semester: z.enum($Enums.Semester),
  week: z.coerce.number().int().min(MIN_WEEK).max(MAX_WEEK),
})

export default async function Page({ params }: PageFileProps) {
  const { data, success } = CurrentWeekValidator.safeParse(await params)

  if (!success) {
    redirect(routes.ROLL_CALL)
  }

  const profiles = await prisma.profile.findMany()
  const attendances = await prisma.attendance.findMany({
    where: data,
  })

  return (
    <WeeklyAttendance {...data} profiles={profiles} attendances={attendances} />
  )
}
