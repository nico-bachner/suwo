import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { Attendance, Profile } from '@/generated/prisma'
import prisma from '@/lib/prisma'

type RollCallEntryProps = {
  year: Attendance['year']
  semester: Attendance['semester']
  week: Attendance['week']
  profile: Profile
  present: boolean
}

export const RollCallEntry = ({
  year,
  semester,
  week,
  profile,
  present,
}: RollCallEntryProps) => (
  <form
    action={async () => {
      'use server'

      await prisma.attendance.create({
        data: {
          year,
          semester,
          week,
          user: {
            connect: {
              id: profile.user_id,
            },
          },
        },
      })
    }}
    className="flex flex-row items-center odd:bg-gray-800"
  >
    <p className="flex flex-1 flex-row gap-2 px-4 font-bold">
      <span className="text-gray-300">{profile.display_name}</span>
      <span className="text-gray-500">{profile.instrument_name}</span>
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
)
