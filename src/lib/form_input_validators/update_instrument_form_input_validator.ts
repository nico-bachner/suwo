import z from 'zod'

export const UpdateInstrumentFormInputValidator = z.object({
  instrument_ids: z.array(z.uuid()),
})

export type UpdateInstrumentFormInput = z.infer<
  typeof UpdateInstrumentFormInputValidator
>
