import { BASE_URL } from '@/config'
import { RollCallQRCodeDialog } from '@/features/roll_call/roll_call_qr_code_dialog'
import { Attendance, Profile } from '@/generated/prisma'

import { AttendanceEntry } from './attendance_entry'
import { RollCallNavigation } from './roll_call_navigation'

type WeeklyAttendanceProps = {
  year: Attendance['year']
  semester: Attendance['semester']
  week: Attendance['week']
  profiles: Profile[]
  attendances: Attendance[]
}

export const WeeklyAttendance = ({
  year,
  semester,
  week,
  profiles,
  attendances,
}: WeeklyAttendanceProps) => (
  <div>
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1 className="text-center">Roll Call</h1>
      <p>{`Week ${week} (${attendances.length} present)`}</p>

      <div className="flex w-full max-w-screen-sm flex-col">
        {profiles.map((profile) => (
          <AttendanceEntry
            key={profile.user_id}
            year={year}
            semester={semester}
            week={week}
            profile={profile}
          />
        ))}
      </div>

      <RollCallNavigation year={year} semester={semester} week={week} />

      <RollCallQRCodeDialog
        value={`${BASE_URL}/roll-call/${year}/${semester}/${week}`}
        className="sticky right-4 self-end max-lg:bottom-20 lg:fixed lg:top-12 lg:right-12"
      />
    </div>
  </div>
)
