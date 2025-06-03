import Link from 'next/link'
import { Fragment } from 'react'

import { PageLayout } from '@/components/server/page_layout'

import { MemberScreenProps } from './types'

export const MembersScreen = ({
  instrumentsByFamily,
  membersByInstrument,
}: MemberScreenProps) => (
  <PageLayout title="Members" className="prose">
    {Object.keys(instrumentsByFamily).map((family) => (
      <Fragment key={family}>
        <h2>{family}</h2>

        <div className="grid grid-cols-2 gap-2">
          {instrumentsByFamily[family].map((instrument) =>
            membersByInstrument[instrument.name]?.map(
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
            ),
          )}
        </div>
      </Fragment>
    ))}
  </PageLayout>
)
