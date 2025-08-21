import { QueryClient, UseMutationOptions } from '@tanstack/react-query'

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
  EventAttendee['user_id'],
  Error,
  EventAttendee['user_id'],
  EventAttendee['user_id'][]
> => ({
  mutationFn: async (variables) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...queryKeys.EVENT_ATTENDEES(event_id)] }),
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(variables),
        },
      ),
    )

    switch (response.status) {
      case StatusCode.Created:
        return EventAttendeeValidator.shape.user_id.parse(response.data)
      default:
        throw new Error('Failed to fetch data')
    }
  },
  onMutate: async (variables) => {
    await queryClient.cancelQueries({
      queryKey: queryKeys.EVENT_ATTENDEES(event_id),
    })

    const snapshot = queryClient.getQueryData<EventAttendee['user_id'][]>(
      queryKeys.EVENT_ATTENDEES(event_id),
    )

    queryClient.setQueryData<EventAttendee['user_id'][]>(
      queryKeys.EVENT_ATTENDEES(event_id),
      (snapshot) => (snapshot ? [...snapshot, variables] : [variables]),
    )

    return snapshot
  },
  onError: (error, _, context) => {
    queryClient.setQueryData<EventAttendee['user_id'][]>(
      queryKeys.EVENT_ATTENDEES(event_id),
      context,
    )

    // eslint-disable-next-line no-alert, no-undef
    alert(`${error.message}\n\nPlease try again`)
  },
  onSettled: async (data) => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.EVENT_ATTENDEES(event_id),
    })

    if (data) {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.PROFILE(data),
      })
    }
  },
})
