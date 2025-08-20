import z from 'zod'

export const UserInstrumentValidator = z.object({
  user_id: z.uuid(),
  instrument_id: z.uuid(),

  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type UserInstrument = z.infer<typeof UserInstrumentValidator>
