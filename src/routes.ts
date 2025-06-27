import { routes as authRoutes } from './features/auth/routes'
import { routes as mailingListRoutes } from './features/mailing_list/routes'
import { routes as profileRoutes } from './features/profiles/routes'
import { routes as rollCallRoutes } from './features/roll_call/routes'

export const routes = {
  ...authRoutes,
  ...mailingListRoutes,
  ...profileRoutes,
  ...rollCallRoutes,
}
