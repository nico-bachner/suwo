import { MailingListRecipient } from '@/generated/prisma'

import { MailingListRecipientDTO } from '../validators/dtos/mailing_list_recipient_dto_validator'

export const getMailingListRecipientDTO = (
  mailingListRecipient: MailingListRecipient,
): MailingListRecipientDTO => ({
  user_id: mailingListRecipient.user_id,
  email: mailingListRecipient.email,
  created_at: mailingListRecipient.created_at.toISOString(),
  updated_at: mailingListRecipient.updated_at.toISOString(),
})
