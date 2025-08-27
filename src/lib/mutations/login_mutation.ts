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

export const loginMutation = (
  queryClient: QueryClient,
): UseMutationOptions<
  UserDTO,
  Error,
  Pick<UserInput, 'email' | 'password'>
> => ({
  mutationFn: async (value) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', 'auth', 'login'] }), {
        method: 'POST',
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
        throw new Error(response.error)
      default:
        throw new Error('Failed to fetch data')
    }
  },
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: async (_, variables) => {
    if (variables.password) {
      toast.success('Logged in successfully.')

      await queryClient.invalidateQueries({
        queryKey: queryKeys.SESSIONS(),
      })
      await queryClient.invalidateQueries({
        queryKey: queryKeys.SESSION(),
      })
    } else {
      toast.success(
        `An email with login instructions has been sent to ${variables.email}`,
      )
    }
  },
})
