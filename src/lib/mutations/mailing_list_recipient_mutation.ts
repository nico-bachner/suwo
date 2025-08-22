import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'
import {
  MailingListRecipient,
  MailingListRecipientValidator,
} from '../validators/mailing_list_recipient'

export const mailingListRecipientMutation = (
  queryClient: QueryClient,
  user_id: MailingListRecipient['user_id'],
): UseMutationOptions<MailingListRecipient | null, Error, boolean> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(
        createURL({
          path: ['api', ...queryKeys.MAILING_LIST_RECIPIENT(user_id)],
        }),
        {
          method: value ? 'POST' : 'DELETE',
        },
      ),
    )

    switch (response.status) {
      case StatusCode.Created:
        return MailingListRecipientValidator.parse(response.data)
      case StatusCode.NoContent:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: () => {
    toast.success('Successfully updated mailing list preference')
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.MAILING_LIST_RECIPIENTS(),
    })
    await queryClient.invalidateQueries({
      queryKey: queryKeys.MAILING_LIST_RECIPIENT(user_id),
    })
  },
})
