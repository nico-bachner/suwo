import { eventMutation } from './event_mutation'
import { eventsMutation } from './events_mutation'
import { instrumentsMutation } from './instruments_mutation'
import { loginMutation } from './login_mutation'
import { sessionMutation } from './session_mutation'
import { sessionsMutation } from './sessions_mutation'
import { userMutation } from './user_mutation'
import { usersMutation } from './users_mutation'

export const mutations = {
  // Auth
  LOGIN: loginMutation,

  // Event
  EVENTS: eventsMutation,
  EVENT: eventMutation,

  // Instrument
  INSTRUMENTS: instrumentsMutation,

  // Session
  SESSIONS: sessionsMutation,
  SESSION: sessionMutation,

  // User
  USERS: usersMutation,
  USER: userMutation,
}
