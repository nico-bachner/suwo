'use server'

import { addPracticePartToDB } from '@/lib/db/practice_parts/add'
import { PracticePart } from '@/lib/db/types'

export const addPracticePart = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries())

  const part: PracticePart = {
    piece: data.piece as string,
    instrument: data.instrument as string, 
    url: data.url as string,
  }

  await addPracticePartToDB(part)
}
