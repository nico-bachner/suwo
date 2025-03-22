import { z } from 'zod'

export const validateMailingList = async (value: FormDataEntryValue | null) =>
  z.boolean().safeParseAsync(value == 'on')
