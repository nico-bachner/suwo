import { z } from 'zod'

import { Semester } from './date_manupulation'

export const parseSemester = (semester: string) =>
  z.nativeEnum(Semester).safeParse(semester).data
