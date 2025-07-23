import { logWeeklyAttendanceMutation } from './log_attendance_mutation'
import { deleteSessionMutation } from './session_mutation'

export const mutations = {
  DELETE_SESSION: deleteSessionMutation,
  LOG_WEEKLY_ATTENDANCE: logWeeklyAttendanceMutation,
}
