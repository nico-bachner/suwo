import {
  apiRoutes as attendanceApiRoutes,
  mutations as attendanceMutations,
  queryKeys as attendanceQueryKeys,
  routes as attendanceRoutes,
} from './features/attendance/routes'
import {
  apiRoutes as authApiRoutes,
  mutations as authMutations,
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

export const queryKeys = {
  ...attendanceQueryKeys,
  ...authQueryKeys,
  ...profileQueryKeys,
}

export const mutations = {
  ...attendanceMutations,
  ...authMutations,
}

export const apiRoutes = {
  ...attendanceApiRoutes,
  ...authApiRoutes,
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
