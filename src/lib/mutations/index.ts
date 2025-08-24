import { deleteSessionMutation } from './delete_session_mutation'
import { userMutation } from './user_mutation'
import { usersMutation } from './users_mutation'

export const mutations = {
  // Session
  DELETE_SESSION: deleteSessionMutation,

  // User
  USER: userMutation,
  USERS: usersMutation,
}
