import { deleteSessionMutation } from './delete_session_mutation'
import { eventAttendeesMutation } from './event_attendees_mutation'
import { userInstrumentsMutation } from './user_instruments_mutation'
import { userMutation } from './user_mutation'

export const mutations = {
  // Event
  EVENT_ATTENDEES: eventAttendeesMutation,

  // Session
  DELETE_SESSION: deleteSessionMutation,

  // User
  USER: userMutation,
  USER_INSTRUMENTS: userInstrumentsMutation,
}
