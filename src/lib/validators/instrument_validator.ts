import z from 'zod'

export const InstrumentValidator = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
})

export type Instrument = z.infer<typeof InstrumentValidator>
