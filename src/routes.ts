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
import { routes as marketingRoutes } from './features/marketing/routes'
import {
  apiRoutes as profileApiRoutes,
  queryKeys as profileQueryKeys,
  routes as profileRoutes,
} from './features/profile/routes'
import { createURL } from './utils/http/create_url'

export const queryKeys = {
  ...attendanceQueryKeys,
  ...authQueryKeys,
  ...profileQueryKeys,
  CURRENT_WEEK: () => ['current-week'],
  EQUIPMENT: () => ['equipment'],
  INSTRUMENTS: () => ['instruments'],
  MAILING_LIST_RECIPIENTS: () => ['mailing-list', 'recipients'],
  MAILING_LIST_PREFERENCE: () => ['mailing-list', 'preference'],
  MY_INSTRUMENTS: () => ['my-instruments'],
  USER_ROLES: () => ['user-roles'],
}

export const apiRoutes = {
  ...attendanceApiRoutes,
  ...authApiRoutes,
  ...profileApiRoutes,
  CREATE_INSTRUMENT: () => createURL({ path: ['api', 'instruments'] }),
  CURRENT_WEEK: () => createURL({ path: ['api', 'usyd', 'current-week'] }),
  EQUIPMENT: () => createURL({ path: ['api', 'equipment'] }),
  INSTRUMENTS: () => createURL({ path: ['api', 'instruments'] }),
  MAILING_LIST_RECIPIENTS: () =>
    createURL({ path: ['api', 'mailing-list', 'recipients'] }),
  MAILING_LIST_PREFERENCE: () =>
    createURL({ path: ['api', 'mailing-list', 'preference'] }),
  MY_INSTRUMENTS: () => createURL({ path: ['api', 'my-instruments'] }),
  USER_ROLES: () => createURL({ path: ['api', 'auth', 'user-roles'] }),
}

export const routes = {
  ...attendanceRoutes,
  ...authRoutes,
  ...marketingRoutes,
  ...profileRoutes,
  CALENDAR: () => createURL({ path: ['calendar'] }),
  EQUIPMENT: () => createURL({ path: ['equipment'] }),
  SETTINGS: () => createURL({ path: ['settings'] }),
}
