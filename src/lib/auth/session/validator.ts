import { z } from 'zod/v4'

export const SessionValidator = z.object({
  id: z.uuidv4(),
})
