import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { queryKeys } from '../queries'
import {
  EventAttendee,
  EventAttendeeValidator,
} from '../validators/event_attendee_validator'
import { Profile } from '../validators/profile_validator'

type Context = {
  eventAttendees: EventAttendee['user_id'][] | undefined
  profile: Profile | undefined
}

export const eventAttendeesMutation = (
  queryClient: QueryClient,
  event_id: EventAttendee['event_id'],
): UseMutationOptions<
  EventAttendee['user_id'],
  Error,
  EventAttendee['user_id'],
  Context
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
      case StatusCode.Conflict:
        throw new Error(response.error)
      default:
        throw new Error('Failed to fetch data')
    }
  },
  onMutate: async (variables) => {
    await queryClient.cancelQueries({
      queryKey: queryKeys.EVENT_ATTENDEES(event_id),
    })
    await queryClient.cancelQueries({
      queryKey: queryKeys.PROFILE(variables),
    })

    const context: Context = {
      eventAttendees: queryClient.getQueryData<EventAttendee['user_id'][]>(
        queryKeys.EVENT_ATTENDEES(event_id),
      ),
      profile: queryClient.getQueryData<Profile>(queryKeys.PROFILE(variables)),
    }

    queryClient.setQueryData<EventAttendee['user_id'][]>(
      queryKeys.EVENT_ATTENDEES(event_id),
      (snapshot) => {
        if (!snapshot) {
          return [variables]
        }

        return [...snapshot, variables]
      },
    )

    queryClient.setQueryData<Profile>(
      queryKeys.PROFILE(variables),
      (snapshot) => {
        if (!snapshot) {
          return undefined
        }

        return {
          ...snapshot,
          events: [...snapshot.events, event_id],
        }
      },
    )

    return context
  },
  onError: (error, variables, context) => {
    if (context) {
      queryClient.setQueryData<EventAttendee['user_id'][]>(
        queryKeys.EVENT_ATTENDEES(event_id),
        context.eventAttendees,
      )
      queryClient.setQueryData<Profile>(
        queryKeys.PROFILE(variables),
        context.profile,
      )
    }

    toast.error(error.message)
  },
  onSuccess: () => {
    toast.success('Successfully updated attendance status')
  },
  onSettled: async (data) => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.EVENT_ATTENDEES(event_id),
    })

    await queryClient.invalidateQueries({
      queryKey: queryKeys.PROFILES(),
    })

    if (data) {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.PROFILE(data),
      })
    }
  },
})
