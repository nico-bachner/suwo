import { $Enums } from '@/generated/prisma'
import { getCurrentSemester } from '@/utils/date_manupulation/get_current_semester'

import { SessionCode } from './session_code'

export const getCurrentSemesterSessionCode = () => {
  const currentSemester = getCurrentSemester()

  switch (currentSemester) {
    case $Enums.Semester.SEMESTER_1:
      return SessionCode.SEMESTER_1
    case $Enums.Semester.SEMESTER_2:
      return SessionCode.SEMESTER_2
  }
}
