import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  EventDTO,
  EventDTOValidator,
  EventInput,
} from '../dtos/event_dto_validator'
import { queryKeys } from '../queries'

export const eventsMutation = (
  queryClient: QueryClient,
): UseMutationOptions<EventDTO, Error, EventInput> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...queryKeys.EVENTS()] }), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      }),
    )

    switch (response.status) {
      case StatusCode.Created:
        return EventDTOValidator.parse(response.data)
      case StatusCode.BadRequest:
        throw new Error(response.error)
      default:
        throw new Error('Failed to fetch data')
    }
  },
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: () => {
    toast.success('Successfully created event')
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.EVENTS(),
    })
  },
})
