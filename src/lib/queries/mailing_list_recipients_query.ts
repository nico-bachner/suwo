import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { apiRoutes, queryKeys } from '@/routes'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

const schema = z.array(
  z.object({
    user_id: z.uuid(),
    email: z.email(),
  }),
)

export type MailingListRecipients = z.infer<typeof schema>

export const mailingListRecipientsQuery =
  (): UseQueryOptions<MailingListRecipients> => ({
    queryKey: queryKeys.MAILING_LIST_RECIPIENTS(),
    queryFn: async ({ signal }) => {
      const response = await parseResponse(
        await fetch(apiRoutes.MAILING_LIST_RECIPIENTS(), { signal }),
      )

      switch (response.status) {
        case StatusCode.OK: {
          const { data, error, success } = schema.safeParse(response.data)

          if (!success) {
            throw new Error(z.prettifyError(error))
          }

          return data
        }
        default:
          throw new Error('Failed to fetch data')
      }
    },
  })
