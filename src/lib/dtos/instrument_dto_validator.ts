import z from 'zod'

export const InstrumentDTOValidator = z.object({
  // ID
  id: z.uuid(),

  // Required Attributes
  name: z.string().trim().min(1, 'Instrument name is required'),

  // Relations
  players: z.array(z.uuid()),

  // Metadata
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type InstrumentDTO = z.infer<typeof InstrumentDTOValidator>
