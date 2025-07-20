import { Attendance, Profile } from '@/generated/prisma'

export type { Attendance }
export type WeeklyAttendances = Pick<Attendance, 'year' | 'semester' | 'week'>

export type WeeklyAttendanceEntryProps = {
  attendanceData: WeeklyAttendances
  profile: Profile
}
