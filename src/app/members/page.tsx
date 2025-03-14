import Link from 'next/link'
import { Fragment } from 'react'

import { PageLayout } from '@/components/ui/page_layout'
import { getMembers } from '@/lib/db/members/get'
import { Instrument, Profile } from '@/lib/db/types'

export default async function Page() {
  const members = await getMembers()

  const membersByInstrument = members.reduce(
    (accMembersByInstrument, { instrument, ...member }) => {
      if (!instrument) {
        return accMembersByInstrument
      }

      return {
        ...accMembersByInstrument,
        [instrument]: [
          ...(accMembersByInstrument[instrument as string] || []),
          { instrument, ...member } as Profile,
        ],
      }
    },
    {} as Record<Instrument['name'], Profile[]>,
  )

  return (
    <PageLayout title="Members" className="prose">
      {Object.keys(membersByInstrument).map((instrument) => (
        <Fragment key={instrument}>
          <h2>{instrument}</h2>

          <div className="grid grid-cols-2 gap-2">
            {membersByInstrument[instrument].map(
              ({ id, given_name, family_name, instrument }) => (
                <Link
                  key={id}
                  href={`/members/${id}`}
                  className="flex flex-col rounded-lg bg-gray-900 px-4 py-2 font-bold"
                >
                  <span className="text-gray-300">
                    {given_name} {family_name}
                  </span>

                  <span className="text-gray-500">{instrument}</span>
                </Link>
              ),
            )}
          </div>
        </Fragment>
      ))}
    </PageLayout>
  )
}
