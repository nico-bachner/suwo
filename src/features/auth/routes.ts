import { VerificationToken } from '@/generated/prisma'

import { LoginScreenSearchParams } from './login_screen_search_params_validator'

export const routes = {
  REGISTER: '/register',
  LOGIN: (searchParams?: LoginScreenSearchParams) => {
    if (!searchParams) {
      return '/login'
    }

    const params = new URLSearchParams(searchParams)
    return `/login?${params.toString()}`
  },
  API_REGISTER: '/api/auth/register',
  API_LOGIN_WITH_PASSWORD: '/api/auth/login/password',
  API_LOGIN_WITH_MAGIC_LINK: '/api/auth/login/magic-link',
  API_VALIDATE_MAGIC_LINK: ({
    user_id,
    token,
  }: Pick<VerificationToken, 'user_id' | 'token'>) =>
    `/api/auth/validate-magic-link/${encodeURIComponent(user_id)}?token=${encodeURIComponent(token)}`,
  API_UPDATE_PASSWORD: '/api/auth/update-password',
}
