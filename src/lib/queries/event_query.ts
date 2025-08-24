import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { EventDTO, EventDTOValidator } from '../dtos/event_dto_validator'

export const eventQueryKey = (id: EventDTO['id']) => ['events', id]

export const eventQuery = (
  id: EventDTO['id'],
): UseQueryOptions<EventDTO | null> => ({
  queryKey: eventQueryKey(id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...eventQueryKey(id)] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return EventDTOValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
