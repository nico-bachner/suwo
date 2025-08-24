import { deleteSessionMutation } from './delete_session_mutation'
import { eventMutation } from './event_mutation'
import { userMutation } from './user_mutation'
import { usersMutation } from './users_mutation'

export const mutations = {
  // Event
  EVENT: eventMutation,

  // Session
  DELETE_SESSION: deleteSessionMutation,

  // User
  USER: userMutation,
  USERS: usersMutation,
}
