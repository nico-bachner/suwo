import { deleteSessionMutation } from './delete_session_mutation'
import { logWeeklyAttendanceMutation } from './log_attendance_mutation'
import { userInstrumentsMutation } from './user_instruments_mutation'

export const mutations = {
  DELETE_SESSION: deleteSessionMutation,
  LOG_WEEKLY_ATTENDANCE: logWeeklyAttendanceMutation,
  USER_INSTRUMENTS: userInstrumentsMutation,
}
