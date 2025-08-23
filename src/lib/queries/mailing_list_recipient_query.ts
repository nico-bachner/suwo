import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  MailingListRecipientDTO,
  MailingListRecipientDTOValidator,
} from '../validators/dtos/mailing_list_recipient_dto_validator'

export const mailingListRecipientQueryKey = (
  user_id: MailingListRecipientDTO['user_id'],
) => ['mailing-list-recipients', user_id]

export const mailingListRecipientQuery = (
  user_id: MailingListRecipientDTO['user_id'],
): UseQueryOptions<MailingListRecipientDTO | null> => ({
  queryKey: mailingListRecipientQueryKey(user_id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...mailingListRecipientQueryKey(user_id)] }),
        {
          signal,
        },
      ),
    )

    switch (response.status) {
      case StatusCode.OK:
        return MailingListRecipientDTOValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
