import { Semester } from '@/lib/db/types'

export const getSemesterNumber = (currentSemester: Semester) => {
  switch (currentSemester) {
    case 'S1':
      return 1
    case 'S2':
      return 2
    case 'B':
      return undefined
    default:
      currentSemester satisfies never
  }
}
