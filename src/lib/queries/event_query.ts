import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { Event, EventValidator } from '../validators/event_validator'

export const eventQueryKey = (id: Event['id']) => ['events', id]

export const eventQuery = (id: Event['id']): UseQueryOptions<Event | null> => ({
  queryKey: eventQueryKey(id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...eventQueryKey(id)] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return EventValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
