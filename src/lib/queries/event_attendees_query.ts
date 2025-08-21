import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  EventAttendee,
  EventAttendeeValidator,
} from '../validators/event_attendee_validator'

export const eventAttendeesQueryKey = (event_id: EventAttendee['event_id']) => [
  'events',
  event_id,
  'attendees',
]

export const eventAttendeesQuery = (
  event_id: EventAttendee['event_id'],
): UseQueryOptions<EventAttendee['user_id'][]> => ({
  queryKey: eventAttendeesQueryKey(event_id),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...eventAttendeesQueryKey(event_id)] }),
        {
          signal,
        },
      ),
    )

    switch (response.status) {
      case StatusCode.OK:
        return z
          .array(EventAttendeeValidator.shape.user_id)
          .parse(response.data)
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
