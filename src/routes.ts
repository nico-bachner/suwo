import { routes as authRoutes } from './features/auth/routes'
import { routes as mailingListRoutes } from './features/mailing_list/routes'
import { routes as profileRoutes } from './features/profiles/routes'

export const routes = {
  ...authRoutes,
  ...mailingListRoutes,
  ...profileRoutes,
}
