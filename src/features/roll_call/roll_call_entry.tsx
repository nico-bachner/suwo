import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { createRollCallEntry } from '@/lib/db/roll_call_entry/create'

import { RollCallEntryProps } from './types'

export const RollCallEntry = ({
  id,
  year,
  semester,
  week,
  given_name,
  family_name,
  instrument,
  present,
}: RollCallEntryProps) => (
  <form
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
)
