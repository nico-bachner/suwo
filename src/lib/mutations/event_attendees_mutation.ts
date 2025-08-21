import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'
import {
  EventAttendee,
  EventAttendeeValidator,
} from '../validators/event_attendee_validator'

export const eventAttendeesMutation = (
  queryClient: QueryClient,
  event_id: EventAttendee['event_id'],
): UseMutationOptions<
  EventAttendee['user_id'][],
  Error,
  EventAttendee['user_id'][]
> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...queryKeys.EVENT_ATTENDEES(event_id)] }),
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
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
  onError: (error) => {
    // eslint-disable-next-line no-alert, no-undef
    alert(`${error.message}\n\nPlease try again`)
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.EVENT_ATTENDEES(event_id),
    })
  },
})
