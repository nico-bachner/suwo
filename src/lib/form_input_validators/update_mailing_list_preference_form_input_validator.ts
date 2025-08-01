import z from 'zod'

export const UpdateMailingListPreferenceFormInputValidator = z.object({
  mailing_list_preference: z.boolean(),
})

export type UpdateMailingListPreferenceFormInput = z.infer<
  typeof UpdateMailingListPreferenceFormInputValidator
>
