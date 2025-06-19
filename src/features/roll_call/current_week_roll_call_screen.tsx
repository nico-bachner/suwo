import { CreateMemberFromRollCall } from '@/components/forms/roll_call'
import { PageLayout } from '@/components/server/page_layout'
import { BASE_URL } from '@/config'
import { RollCallQRCodeDialog } from '@/features/roll_call/roll_call_qr_code_dialog'

import { RollCallEntry } from './roll_call_entry'
import { RollCallNavigation } from './roll_call_navigation'
import { RollCallScreenProps } from './types'

export const CurrentWeekRollCallScreen = ({
  year,
  semester,
  week,
  rollCallEntries,
}: RollCallScreenProps) => (
  <PageLayout
    title="Roll Call"
    subtitle={`Week ${week} (${rollCallEntries.filter(({ present }) => present).length})`}
    className="prose flex flex-col gap-6"
  >
    <div className="flex w-full max-w-screen-sm flex-col">
      {rollCallEntries.map((entry) => (
        <RollCallEntry
          key={entry.id}
          year={year}
          semester={semester}
          week={week}
          {...entry}
        />
      ))}
    </div>

    <RollCallNavigation year={year} semester={semester} week={week} />

    <h2>Not in the list?</h2>

    <CreateMemberFromRollCall />

    <RollCallQRCodeDialog
      value={`${BASE_URL}/roll-call/${year}/${semester}/${week}`}
      className="sticky right-4 self-end max-lg:bottom-20 lg:fixed lg:top-12 lg:right-12"
    />
  </PageLayout>
)
