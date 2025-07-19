import {
  apiRoutes as attendanceApiRoutes,
  queryKeys as attendanceQueryKeys,
  routes as attendanceRoutes,
} from './features/attendance/routes'
import { routes as authRoutes } from './features/auth/routes'
import { routes as mailingListRoutes } from './features/mailing_list/routes'
import { routes as marketingRoutes } from './features/marketing/routes'
import { routes as profileRoutes } from './features/profile/routes'
import { routes as settingsRoutes } from './features/settings/routes'

export const queryKeys = {
  ...attendanceQueryKeys,
}

export const apiRoutes = {
  ...attendanceApiRoutes,
}

export const routes = {
  ...attendanceRoutes,
  ...authRoutes,
  ...mailingListRoutes,
  ...marketingRoutes,
  ...profileRoutes,
  ...settingsRoutes,
}
