import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { CreateMemberFromRollCall } from '@/components/forms/roll_call'
import { PageLayout } from '@/components/server/page_layout'
import { QRCodeDialog } from '@/components/ui/qr_code_dialog'
import { MAX_WEEK } from '@/config'
import { createRollCallEntry } from '@/lib/db/roll_call_entry/create'
import { Member, Semester, Table } from '@/lib/db/types'
import { BASE_URL } from '@/utils/base_url'

type RollCallScreenProps = {
  year: number
  semester: Semester
  week: number
  rollCallEntries: Table<
    Member & {
      present?: boolean
    }
  >
}

export const RollCallScreen = ({
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
      {rollCallEntries.map(
        ({ id, given_name, family_name, present, instrument }) => (
          <form
            key={id}
            action={async () => {
              'use server'

              await createRollCallEntry({
                year,
                semester,
                week,
                member: id,
              })
            }}
            className="flex flex-row items-center odd:bg-gray-800"
          >
            <p className="flex flex-1 flex-row gap-2 px-4 font-bold">
              <span className="text-gray-300">
                {given_name} {family_name}
              </span>
              <span className="text-gray-500">{instrument}</span>
            </p>

            {present ? (
              <CheckIcon className="box-content h-6 w-6 stroke-green-300 px-4 py-3" />
            ) : (
              <button
                type="submit"
                className="cursor-pointer px-4 py-3 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              >
                <PlusIcon className="h-6 w-6 stroke-gray-300" />
              </button>
            )}
          </form>
        ),
      )}
    </div>

    <nav className="sticky bottom-0 mx-auto grid w-full max-w-screen-sm grid-cols-2 gap-4 bg-gray-950/90 p-4 backdrop-blur-lg">
      {week > 1 && (
        <Link
          href={`/roll-call/${year}/${semester}/${week - 1}`}
          className="col-start-1 flex flex-row items-center justify-self-start rounded-md hover:bg-gray-900"
        >
          <ChevronLeftIcon className="box-content h-5 w-5 stroke-gray-300 p-2" />
          <span className="py-2 pr-4 text-gray-300">Week {week - 1}</span>
        </Link>
      )}

      {week < MAX_WEEK && (
        <Link
          href={`/roll-call/${year}/${semester}/${week + 1}`}
          className="col-start-2 flex flex-row items-center justify-self-end rounded-md hover:bg-gray-900"
        >
          <span className="py-2 pl-4 text-gray-300">Week {week + 1}</span>
          <ChevronRightIcon className="box-content h-5 w-5 stroke-gray-300 p-2" />
        </Link>
      )}
    </nav>

    <h2>Not in the list?</h2>

    <CreateMemberFromRollCall />

    <QRCodeDialog
      value={`${BASE_URL}/roll-call/${year}/${semester}/${week}`}
      className="sticky right-4 self-end max-lg:bottom-20 lg:fixed lg:top-12 lg:right-12"
    />
  </PageLayout>
)
