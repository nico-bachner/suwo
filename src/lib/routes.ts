import { LoginMethod } from '@/features/auth/login_method_validator'
import { createURL } from '@/utils/http/create_url'

import { EventDTO } from './dtos/event_dto_validator'
import { UserDTO } from './dtos/user_dto_validator'

export const routes = {
  // Auth
  REGISTER: () => createURL({ path: ['register'] }),
  LOGIN: (method?: LoginMethod) =>
    createURL({
      path: ['login'],
      query: { method },
    }),

  // Calendar
  CALENDAR: () => createURL({ path: ['calendar'] }),

  // Events
  EVENTS: () => createURL({ path: ['events'] }),
  EVENT: (id: EventDTO['id']) => createURL({ path: ['events', id] }),

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
