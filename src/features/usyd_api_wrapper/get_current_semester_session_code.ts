import { getCurrentSemester } from '@/utils/date_manipulation/get_current_semester'
import { Semester } from '@/utils/date_manipulation/semester'

import { SessionCode } from './session_code'

export const getCurrentSemesterSessionCode = () => {
  const currentSemester = getCurrentSemester()

  switch (currentSemester) {
    case Semester.SEMESTER_1:
      return SessionCode.SEMESTER_1
    case Semester.SEMESTER_2:
      return SessionCode.SEMESTER_2
  }
}
