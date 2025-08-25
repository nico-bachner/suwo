import { UseQueryOptions } from '@tanstack/react-query'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { SessionDTO, SessionDTOValidator } from '../dtos/session_dto_validator'

export const sessionQueryKey = () => ['sessions', 'current']

export const sessionQuery = (): UseQueryOptions<SessionDTO | null> => ({
  queryKey: sessionQueryKey(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...sessionQueryKey()] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return SessionDTOValidator.parse(response.data)
      case StatusCode.NotFound:
        return null
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
