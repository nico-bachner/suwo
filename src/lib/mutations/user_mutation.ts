import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  UserDTO,
  UserDTOValidator,
  UserInput,
} from '../dtos/user_dto_validator'
import { queryKeys } from '../queries'

export const userMutation = (
  queryClient: QueryClient,
  id: UserDTO['id'],
): UseMutationOptions<UserDTO, Error, Partial<UserInput>> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...queryKeys.USER(id)] }), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return UserDTOValidator.parse(response.data)
      case StatusCode.BadRequest:
      case StatusCode.Unauthorized:
      case StatusCode.Forbidden:
      case StatusCode.NotFound:
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
      queryKey: queryKeys.USERS(),
    })
    await queryClient.invalidateQueries({
      queryKey: queryKeys.USER(id),
    })
    data?.events.forEach(async (eventId) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.EVENT(eventId),
      })
    })
  },
})
