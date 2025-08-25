import {
  currentSessionQuery,
  currentSessionQueryKey,
} from './current_session_query'
import { equipmentQuery } from './equipment_query'
import { eventQuery, eventQueryKey } from './event_query'
import { eventsQuery, eventsQueryKey } from './events_query'
import { instrumentsQuery, instrumentsQueryKey } from './instruments_query'
import { userQuery, userQueryKey } from './user_query'
import { usersQuery, usersQueryKey } from './users_query'

export const queryKeys = {
  // Event
  EVENTS: eventsQueryKey,
  EVENT: eventQueryKey,

  // Instrument
  INSTRUMENTS: instrumentsQueryKey,

  // Session
  CURRENT_SESSION: currentSessionQueryKey,

  // User
  USERS: usersQueryKey,
  USER: userQueryKey,
}

export const queries = {
  // Equipment
  EQUIPMENT: equipmentQuery,

  // Event
  EVENTS: eventsQuery,
  EVENT: eventQuery,

  // Instrument
  INSTRUMENTS: instrumentsQuery,

  // Session
  CURRENT_SESSION: currentSessionQuery,

  // User
  USERS: usersQuery,
  USER: userQuery,
}
