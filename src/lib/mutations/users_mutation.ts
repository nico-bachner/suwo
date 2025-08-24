import { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { UserDTO, UserDTOValidator } from '../dtos/user_dto_validator'
import { queryKeys } from '../queries'

export const usersMutation = (
  queryClient: QueryClient,
): UseMutationOptions<
  UserDTO,
  Error,
  Omit<UserDTO, 'id' | 'attendance_rate' | 'created_at' | 'updated_at'>
> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...queryKeys.USERS()] }), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      }),
    )

    switch (response.status) {
      case StatusCode.Created:
        return UserDTOValidator.parse(response.data)
      case StatusCode.BadRequest:
        throw new Error(response.error)
      default:
        throw new Error('Failed to fetch data')
    }
  },
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: () => {
    toast.success('Successfully updated instruments')
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.USERS(),
    })
    await queryClient.invalidateQueries({
      queryKey: queryKeys.SESSION(),
    })
  },
})
