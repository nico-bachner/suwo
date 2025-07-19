import { redirect } from 'next/navigation'
import z from 'zod'

import { FOUNDING_YEAR } from '@/config'
import { WeeklyAttendance } from '@/features/roll_call/weekly_attendance'
import { MAX_WEEK, MIN_WEEK } from '@/features/usyd_api_wrapper/config'
import { $Enums } from '@/generated/prisma'
import { routes } from '@/routes'
import { PageFileProps } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

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
