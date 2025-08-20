import z from 'zod'

export const MailingListRecipientValidator = z.object({
  user_id: z.uuid(),
  email: z.email(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type MailingListRecipient = z.infer<typeof MailingListRecipientValidator>
