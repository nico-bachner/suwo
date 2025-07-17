import { z } from 'zod'

export const SessionValidator = z.object({
  id: z.uuidv4(),
})
