import { eventMutation } from './event_mutation'
import { instrumentsMutation } from './instruments_mutation'
import { sessionMutation } from './session_mutation'
import { userMutation } from './user_mutation'
import { usersMutation } from './users_mutation'

export const mutations = {
  // Event
  EVENT: eventMutation,

  // Instrument
  INSTRUMENTS: instrumentsMutation,

  // Session
  SESSION: sessionMutation,

  // User
  USER: userMutation,
  USERS: usersMutation,
}
