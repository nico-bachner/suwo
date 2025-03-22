import { z } from 'zod'

export const validateEmail = async (value: FormDataEntryValue | null) =>
  z.string().email().trim().safeParseAsync(value)
