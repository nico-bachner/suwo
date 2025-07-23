import {
  apiRoutes as attendanceApiRoutes,
  queryKeys as attendanceQueryKeys,
  routes as attendanceRoutes,
} from './features/attendance/routes'
import {
  apiRoutes as authApiRoutes,
  queryKeys as authQueryKeys,
  routes as authRoutes,
} from './features/auth/routes'
import { routes as mailingListRoutes } from './features/mailing_list/routes'
import { routes as marketingRoutes } from './features/marketing/routes'
import {
  apiRoutes as profileApiRoutes,
  queryKeys as profileQueryKeys,
  routes as profileRoutes,
} from './features/profile/routes'
import { routes as settingsRoutes } from './features/settings/routes'
import { createURL } from './utils/http/create_url'

export const queryKeys = {
  ...attendanceQueryKeys,
  ...authQueryKeys,
  ...profileQueryKeys,
  CURRENT_WEEK: () => ['current-week'],
  INSTRUMENTS: () => ['instruments'],
}

export const apiRoutes = {
  ...attendanceApiRoutes,
  ...authApiRoutes,
  ...profileApiRoutes,
  CURRENT_WEEK: () => createURL({ path: ['api', 'usyd', 'current-week'] }),
  INSTRUMENTS: () => createURL({ path: ['api', 'instruments'] }),
}

export const routes = {
  ...attendanceRoutes,
  ...authRoutes,
  ...mailingListRoutes,
  ...marketingRoutes,
  ...profileRoutes,
  ...settingsRoutes,
  CALENDAR: () => createURL({ path: ['calendar'] }),
}
