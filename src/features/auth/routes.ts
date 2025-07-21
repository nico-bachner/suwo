import { UseQueryOptions } from '@tanstack/react-query'
import { prettifyError } from 'zod'

import { VerificationToken } from '@/generated/prisma'
import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import { LoginScreenSearchParams } from './login_screen_search_params_validator'
import { Session } from './session/types'
import { SessionValidator } from './session/validator'

export const routes = {
  LOGIN: (searchParams?: LoginScreenSearchParams) =>
    createURL({
      path: ['login'],
      query: searchParams,
    }),
  REGISTER: () => createURL({ path: ['register'] }),
}

export const apiRoutes = {
  LOGIN_WITH_PASSWORD: () =>
    createURL({ path: ['api', 'auth', 'login', 'password'] }),
  LOGIN_WITH_MAGIC_LINK: () =>
    createURL({ path: ['api', 'auth', 'login', 'magic-link'] }),
  REGISTER: () => createURL({ path: ['api', 'auth', 'register'] }),
  SESSION: () => createURL({ path: ['api', 'auth', 'session'] }),
  UPDATE_PASSWORD: () =>
    createURL({ path: ['api', 'auth', 'update-password'] }),
  VALIDATE_MAGIC_LINK: ({
    user_id,
    token,
  }: Pick<VerificationToken, 'user_id' | 'token'>) =>
    createURL({
      path: ['api', 'auth', 'validate-magic-link'],
      query: { user_id, token },
    }),
}

export const queryKeys = {
  SESSION: () => ['session'],
}

export const queries = {
  SESSION: (): UseQueryOptions<Session> => ({
    queryKey: queryKeys.SESSION(),
    queryFn: async () => {
      const response = await parseResponse(await fetch(apiRoutes.SESSION()))

      switch (response.status) {
        case StatusCode.OK: {
          const { data, error, success } = SessionValidator.safeParse(
            response.data,
          )

          if (!success) {
            throw new Error(prettifyError(error))
          }

          return data
        }
        default:
          throw new Error('Failed to fetch session data')
      }
    },
    staleTime: Infinity,
  }),
}
