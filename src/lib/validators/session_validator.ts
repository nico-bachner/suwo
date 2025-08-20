import z from 'zod'

export const SessionValidator = z.object({
  user_id: z.uuid(),
})

export type Session = z.infer<typeof SessionValidator>
