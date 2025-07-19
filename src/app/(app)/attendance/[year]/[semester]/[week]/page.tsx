import { redirect } from 'next/navigation'

import { WeeklyAttendancesCoerceValidator } from '@/features/attendance/validators'
import { WeeklyAttendance } from '@/features/attendance/weekly_attendance'
import { routes } from '@/routes'
import { PageFileProps } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export default async function Page({ params }: PageFileProps) {
  const { data, success } = WeeklyAttendancesCoerceValidator.safeParse(
    await params,
  )

  if (!success) {
    redirect(routes.ATTENDANCES())
  }

  const profiles = await prisma.profile.findMany()

  return <WeeklyAttendance {...data} profiles={profiles} />
}
