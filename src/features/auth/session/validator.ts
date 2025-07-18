import { z } from 'zod'

export const SessionValidator = z.object({
  user_id: z.uuidv4(),
})
