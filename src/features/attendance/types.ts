import { Attendance } from '@/generated/prisma'
import { ProfileQueryResult } from '@/lib/queries/profile_query'

export type { Attendance }
export type WeeklyAttendances = Pick<Attendance, 'year' | 'semester' | 'week'>

export type WeeklyAttendanceEntryProps = {
  attendanceData: WeeklyAttendances
  profile: ProfileQueryResult
}
