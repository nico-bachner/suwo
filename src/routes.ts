import { LoginMethod } from './features/auth/login_method_validator'
import { apiRoutes as authApiRoutes } from './features/auth/routes'
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
  // Auth
  LOGIN: (method?: LoginMethod) =>
    createURL({
      path: ['auth', 'login'],
      query: { method },
    }),
  REGISTER: () => createURL({ path: ['auth', 'register'] }),

  // Calendar
  CALENDAR: () => createURL({ path: ['calendar'] }),

  // Equipment
  EQUIPMENT: () => createURL({ path: ['equipment'] }),

  // Events
  EVENTS: () => createURL({ path: ['events'] }),
  EVENT: (id: EventDTO['id']) => createURL({ path: ['events', id] }),
  EVENT_ATTENDEES: (id: EventDTO['id']) =>
    createURL({ path: ['events', id, 'attendees'] }),

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
