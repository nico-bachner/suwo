import z from 'zod'

export const CreateInstrumentFormInputValidator = z.object({
  instrument_name: z.string().trim().min(1, {
    message: 'Instrument name is required',
  }),
})

export type CreateInstrumentFormInput = z.infer<
  typeof CreateInstrumentFormInputValidator
>
