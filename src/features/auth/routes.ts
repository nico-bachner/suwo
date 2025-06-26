import { VerificationToken } from '@/generated/prisma'

export const routes = {
  LOGIN: '/login',
  REGISTER: '/register',
  API_LOGIN: '/api/auth/login',
  API_REGISTER: '/api/auth/register',
  API_MAGIC_LINK: '/api/auth/magic-link',
  API_MAGIC_LINK_VALIDATE: ({
    user_id,
    token,
  }: Pick<VerificationToken, 'user_id' | 'token'>) =>
    `/api/auth/magic-link/validate/${encodeURIComponent(user_id)}?token=${encodeURIComponent(token)}`,
}
