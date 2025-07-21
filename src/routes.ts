import {
  apiRoutes as attendanceApiRoutes,
  queries as attendanceQueries,
  queryKeys as attendanceQueryKeys,
  routes as attendanceRoutes,
} from './features/attendance/routes'
import { routes as authRoutes } from './features/auth/routes'
import { routes as mailingListRoutes } from './features/mailing_list/routes'
import { routes as marketingRoutes } from './features/marketing/routes'
import {
  apiRoutes as profileApiRoutes,
  queries as profileQueries,
  queryKeys as profileQueryKeys,
  routes as profileRoutes,
} from './features/profile/routes'
import { routes as settingsRoutes } from './features/settings/routes'

export const queries = {
  ...attendanceQueries,
  ...profileQueries,
}

export const queryKeys = {
  ...attendanceQueryKeys,
  ...profileQueryKeys,
}

export const apiRoutes = {
  ...attendanceApiRoutes,
  ...profileApiRoutes,
}

export const routes = {
  ...attendanceRoutes,
  ...authRoutes,
  ...mailingListRoutes,
  ...marketingRoutes,
  ...profileRoutes,
  ...settingsRoutes,
}
