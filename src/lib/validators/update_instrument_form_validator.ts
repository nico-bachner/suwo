import z from 'zod'

export const UpdateInstrumentFormValidator = z.object({
  instrument_ids: z.array(z.uuid()),
})
