import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { EventDTO, EventDTOValidator } from '../dtos/event_dto_validator'
import { queryKeys } from '../queries'

export const eventMutation = (
  queryClient: QueryClient,
  id: EventDTO['id'],
): UseMutationOptions<EventDTO, Error, Partial<EventDTO>> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...queryKeys.EVENT(id)] }), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
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
  onSuccess: (_, variables) => {
    toast.success(`Successfully updated ${Object.keys(variables).join(', ')}`)
  },
  onSettled: async (data) => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.EVENTS(),
    })
    await queryClient.invalidateQueries({
      queryKey: queryKeys.EVENT(id),
    })
    await queryClient.invalidateQueries({
      queryKey: queryKeys.USERS(),
    })
    data?.attendees.forEach(async (id) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.USER(id),
      })
    })
  },
})
