import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { Event, EventValidator } from '../validators/event_validator'

export const eventsQueryKey = () => ['events']

export const eventsQuery = (): UseQueryOptions<Event[]> => ({
  queryKey: eventsQueryKey(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...eventsQueryKey()] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK: {
        return z.array(EventValidator).parse(response.data)
      }
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
