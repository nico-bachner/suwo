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
): UseMutationOptions<UserDTO | null, Error, Partial<UserInput> | null> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(
        createURL({ path: ['api', ...queryKeys.USER(id)] }),
        value
          ? {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(value),
            }
          : { method: 'DELETE' },
      ),
    )

    switch (response.status) {
      case StatusCode.OK:
        return UserDTOValidator.parse(response.data)
      case StatusCode.NoContent:
        return null
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
    if (variables) {
      toast.success('Details updated successfully')
    } else {
      toast.success('Account deleted successfully')
    }
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
