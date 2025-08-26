import { createURL } from '@/utils/http/create_url'

export const apiRoutes = {
  LOGIN_WITH_PASSWORD: () =>
    createURL({ path: ['api', 'auth', 'login', 'password'] }),
  LOGIN_WITH_MAGIC_LINK: () =>
    createURL({ path: ['api', 'auth', 'login', 'magic-link'] }),
  VALIDATE_MAGIC_LINK: (token: string) =>
    createURL({
      path: ['api', 'auth', 'validate-magic-link'],
      query: { token },
    }),
}
