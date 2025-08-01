import z from 'zod'

export const CreateInstrumentFormInputValidator = z.object({
  instrument_name: z.string(),
})

export type CreateInstrumentFormInput = z.infer<
  typeof CreateInstrumentFormInputValidator
>
