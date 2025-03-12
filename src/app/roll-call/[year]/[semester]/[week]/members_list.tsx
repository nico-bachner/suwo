import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { createRollCallEntry } from '@/lib/db/queries/create_roll_call_entry'
import { Member, Table } from '@/lib/db/types'

type MembersListProps = {
  data: Table<Member & { present?: boolean }>
  year: number
  semester: number
  week: number
}

export const MembersList = ({ data, ...rollCall }: MembersListProps) => (
  <div className="flex w-full max-w-screen-sm flex-col">
    {data.map(({ id, given_name, family_name, present, instrument }) => (
      <form
        key={id}
        action={async () => {
          'use server'

          await createRollCallEntry({
            ...rollCall,
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
    ))}
  </div>
)
