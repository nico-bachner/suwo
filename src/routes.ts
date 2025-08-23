import {
  apiRoutes as authApiRoutes,
  routes as authRoutes,
} from './features/auth/routes'
import { ProfileDTO } from './lib/dtos/profile_dto_validator'
import { Event } from './lib/validators/event_validator'
import { createURL } from './utils/http/create_url'

export const queryKeys = {
  EQUIPMENT: () => ['equipment'],
}

export const apiRoutes = {
  ...authApiRoutes,
  EQUIPMENT: () => createURL({ path: ['api', 'equipment'] }),
}

export const routes = {
  ...authRoutes,

  // Calendar
  CALENDAR: () => createURL({ path: ['calendar'] }),

  // Events
  EVENTS: () => createURL({ path: ['events'] }),
  EVENT: (id: Event['id']) => createURL({ path: ['events', id] }),
  EVENT_ATTENDEES: (id: Event['id']) =>
    createURL({ path: ['events', id, 'attendees'] }),

  // Equipment
  EQUIPMENT: () => createURL({ path: ['equipment'] }),

  // History
  HISTORY: () => createURL({ path: ['history'] }),
  HISTORY_YEAR: (year: number) => createURL({ path: ['history', year] }),

  // Home
  HOME: () => createURL({ path: [] }),

  // Profiles
  PROFILES: () => createURL({ path: ['members'] }),
  PROFILE: (user_id: ProfileDTO['user_id']) =>
    createURL({ path: ['members', user_id] }),
  PROFILE_EDIT: (user_id: ProfileDTO['user_id']) =>
    createURL({ path: ['members', user_id, 'edit'] }),

  // Settings
  SETTINGS: () => createURL({ path: ['settings'] }),
}
