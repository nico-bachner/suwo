import {
  apiRoutes as authApiRoutes,
  routes as authRoutes,
} from './features/auth/routes'
import { EventDTO } from './lib/dtos/event_dto_validator'
import { UserDTO } from './lib/dtos/user_dto_validator'
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
  EVENT: (id: EventDTO['id']) => createURL({ path: ['events', id] }),
  EVENT_ATTENDEES: (id: EventDTO['id']) =>
    createURL({ path: ['events', id, 'attendees'] }),

  // Equipment
  EQUIPMENT: () => createURL({ path: ['equipment'] }),

  // History
  HISTORY: () => createURL({ path: ['history'] }),
  HISTORY_YEAR: (year: number) => createURL({ path: ['history', year] }),

  // Home
  HOME: () => createURL({ path: [] }),

  // Mailing List
  MAILING_LIST: () => createURL({ path: ['mailing-list'] }),

  // Profiles
  PROFILES: () => createURL({ path: ['members'] }),
  PROFILE: (id: UserDTO['id']) => createURL({ path: ['members', id] }),
  PROFILE_EDIT: (id: UserDTO['id']) =>
    createURL({ path: ['members', id, 'edit'] }),

  // Settings
  SETTINGS: () => createURL({ path: ['settings'] }),
}
