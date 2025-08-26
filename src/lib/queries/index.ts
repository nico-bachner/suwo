import { eventQuery, eventQueryKey } from './event_query'
import { eventsQuery, eventsQueryKey } from './events_query'
import { instrumentsQuery, instrumentsQueryKey } from './instruments_query'
import { sessionQuery, sessionQueryKey } from './session_query'
import { sessionsQuery, sessionsQueryKey } from './sessions_query'
import { userQuery, userQueryKey } from './user_query'
import { usersQuery, usersQueryKey } from './users_query'

export const queryKeys = {
  // Event
  EVENTS: eventsQueryKey,
  EVENT: eventQueryKey,

  // Instrument
  INSTRUMENTS: instrumentsQueryKey,

  // Session
  SESSIONS: sessionsQueryKey,
  SESSION: sessionQueryKey,

  // User
  USERS: usersQueryKey,
  USER: userQueryKey,
}

export const queries = {
  // Event
  EVENTS: eventsQuery,
  EVENT: eventQuery,

  // Instrument
  INSTRUMENTS: instrumentsQuery,

  // Session
  SESSIONS: sessionsQuery,
  SESSION: sessionQuery,

  // User
  USERS: usersQuery,
  USER: userQuery,
}
