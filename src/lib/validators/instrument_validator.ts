import z from 'zod'

export const InstrumentValidator = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1, {
    message: 'Instrument name is required',
  }),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type Instrument = z.infer<typeof InstrumentValidator>
