import Link from 'next/link'
import { Fragment } from 'react'

import { PageLayout } from '@/components/ui/page_layout'
import { getInstruments } from '@/lib/db/instruments/get'
import { getMembersWithInstruments } from '@/lib/db/members/get'
import { Instrument, Profile } from '@/lib/db/types'

export default async function Page() {
  const instruments = await getInstruments()
  const members = await getMembersWithInstruments()

  const instrumentsByFamily = instruments.reduce(
    (accInstrumentsByFamily, { name, family }) => ({
      ...accInstrumentsByFamily,
      [family]: [...(accInstrumentsByFamily[family] || []), name],
    }),
    {} as Record<Instrument['family'], Instrument['name'][]>,
  )

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

  console.log(instrumentsByFamily)
  console.log(membersByInstrument)

  return (
    <PageLayout title="Members" className="prose">
      {Object.keys(instrumentsByFamily).map((family) => (
        <Fragment key={family}>
          {/* <h2>{family}</h2> Re-add when we have enough members */}

          {instrumentsByFamily[family].map(
            (instrument) =>
              membersByInstrument[instrument] && (
                <Fragment key={instrument}>
                  <h3>{instrument}</h3>

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
              ),
          )}
        </Fragment>
      ))}
    </PageLayout>
  )
}
