import z from 'zod'

export type InstrumentDTO = z.infer<typeof InstrumentDTOValidator>
export type InstrumentInput = z.infer<typeof InstrumentInputValidator>

export const InstrumentDTOValidator = z.object({
  // ID
  id: z.uuid(),

  // Required Attributes
  name: z.string(),

  // Relations
  players: z.array(z.uuid()),

  // Metadata
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export const InstrumentInputValidator = z.object({
  // Required Attributes
  name: z.string().trim().min(1, 'Instrument name is required'),

  // Relations
  players: z.array(z.uuid()).optional(),
})
