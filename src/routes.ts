import {
  apiRoutes as attendanceApiRoutes,
  queryKeys as attendanceQueryKeys,
  routes as attendanceRoutes,
} from './features/attendance/routes'
import {
  apiRoutes as authApiRoutes,
  routes as authRoutes,
} from './features/auth/routes'
import { Event } from './lib/validators/event_validator'
import { Profile } from './lib/validators/profile_validator'
import { createURL } from './utils/http/create_url'

export const queryKeys = {
  ...attendanceQueryKeys,
  CURRENT_WEEK: () => ['current-week'],
  EQUIPMENT: () => ['equipment'],
  USER_INSTRUMENTS: (userId: string) => ['user-instruments', userId],
}

export const apiRoutes = {
  ...attendanceApiRoutes,
  ...authApiRoutes,
  CURRENT_WEEK: () => createURL({ path: ['api', 'usyd', 'current-week'] }),
  EQUIPMENT: () => createURL({ path: ['api', 'equipment'] }),
  USER_INSTRUMENTS: (userId: string) =>
    createURL({ path: ['api', 'instruments', userId] }),
  USER_ROLES: () => createURL({ path: ['api', 'auth', 'user-roles'] }),
}

export const routes = {
  ...attendanceRoutes,
  ...authRoutes,

  // Calendar
  CALENDAR: () => createURL({ path: ['calendar'] }),

  // Events
  EVENTS: () => createURL({ path: ['events'] }),
  EVENT: (id: Event['id']) => createURL({ path: ['events', id] }),

  // Equipment
  EQUIPMENT: () => createURL({ path: ['equipment'] }),

  // History
  HISTORY: () => createURL({ path: ['history'] }),
  HISTORY_YEAR: (year: number) => createURL({ path: ['history', year] }),

  // Home
  HOME: () => createURL({ path: [] }),

  // Profiles
  PROFILES: () => createURL({ path: ['members'] }),
  PROFILE: (user_id: Profile['user_id']) =>
    createURL({ path: ['members', user_id] }),
  PROFILE_EDIT: (user_id: Profile['user_id']) =>
    createURL({ path: ['members', user_id, 'edit'] }),

  // Settings
  SETTINGS: () => createURL({ path: ['settings'] }),
}
