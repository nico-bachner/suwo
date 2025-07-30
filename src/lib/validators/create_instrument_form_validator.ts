import z from 'zod'

export const CreateInstrumentFormValidator = z.object({
  instrument_name: z
    .string()
    .min(2, 'Instrument name must be at least 2 characters long'),
})
