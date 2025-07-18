import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { Attendance, Profile } from '@/generated/prisma'
import prisma from '@/lib/prisma'

import { getProfileScreenName } from '../profile/utils/get_profile_screen_name'

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
    className="odd:bg-neutral-6 flex flex-row items-center"
  >
    <p className="flex flex-1 flex-row gap-2 px-4 font-bold">
      <span className="text-neutral-2">{getProfileScreenName(profile)}</span>
      <span className="text-neutral-3">{profile.instrument_name}</span>
    </p>

    {present ? (
      <CheckIcon className="stroke-positive box-content h-6 w-6 px-4 py-3" />
    ) : (
      <button
        type="submit"
        className="focus:ring-neutral-4 cursor-pointer px-4 py-3 focus:ring-2 focus:outline-none"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    )}
  </form>
)
