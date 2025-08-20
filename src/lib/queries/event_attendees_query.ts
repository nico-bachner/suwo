import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { EventAttendees } from '../validators/event_attendees_validator'
import { Profile, ProfileValidator } from '../validators/profile_validator'

export const eventAttendeesQueryKey = (
  event_id: EventAttendees['event_id'],
) => ['event', event_id, 'attendees']

export const eventAttendeesQuery = (
  event_id: EventAttendees['event_id'],
): UseQueryOptions<Profile[]> => ({
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
        return z.array(ProfileValidator).parse(response.data)
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
