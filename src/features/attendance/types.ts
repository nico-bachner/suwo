import { Attendance } from '@/generated/prisma'
import { Profile } from '@/lib/validators/profile_validator'

export type { Attendance }
export type WeeklyAttendances = Pick<Attendance, 'year' | 'semester' | 'week'>
export type WeeklyAttendanceEntryProps = {
  attendanceData: WeeklyAttendances
  profile: Profile
}
