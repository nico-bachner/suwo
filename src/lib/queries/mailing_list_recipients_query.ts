import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  MailingListRecipientDTO,
  MailingListRecipientDTOValidator,
} from '../dtos/mailing_list_recipient_dto_validator'

export const mailingListRecipientsQueryKey = () => ['mailing-list-recipients']

export const mailingListRecipientsQuery = (): UseQueryOptions<
  MailingListRecipientDTO[]
> => ({
  queryKey: mailingListRecipientsQueryKey(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...mailingListRecipientsQueryKey()] }),
        {
          signal,
        },
      ),
    )

    switch (response.status) {
      case StatusCode.OK:
        return z.array(MailingListRecipientDTOValidator).parse(response.data)
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
