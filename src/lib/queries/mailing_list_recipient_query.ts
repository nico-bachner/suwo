import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  MailingListRecipient,
  MailingListRecipientValidator,
} from '../validators/mailing_list_recipient'

export const mailingListRecipientQueryKey = (
  user_id: MailingListRecipient['user_id'],
) => ['mailing-list-recipients', user_id]

export const mailingListRecipientQuery = (
  user_id: MailingListRecipient['user_id'],
): UseQueryOptions<MailingListRecipient | null> => ({
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
        return MailingListRecipientValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
