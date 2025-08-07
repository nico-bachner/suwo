import { createURL } from '@/utils/http/create_url'

import { LoginScreenSearchParams } from './login_screen_search_params_validator'

export const queryKeys = {
  SESSION: () => ['session'],
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
  VALIDATE_MAGIC_LINK: (token: string) =>
    createURL({
      path: ['api', 'auth', 'validate-magic-link'],
      query: { token },
    }),
}

export const routes = {
  LOGIN: (searchParams?: LoginScreenSearchParams) =>
    createURL({
      path: ['login'],
      query: searchParams,
    }),
  REGISTER: () => createURL({ path: ['register'] }),
}
