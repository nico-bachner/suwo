import { Attendance } from '@/generated/prisma'

export type { Attendance }
export type WeeklyAttendances = Pick<Attendance, 'year' | 'semester' | 'week'>
