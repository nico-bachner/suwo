import { MembersScreen } from '@/features/members'
import { getInstrumentsByFamily } from '@/features/members/get_instruments_by_family'
import { getMembersByInstrument } from '@/features/members/get_members_by_instrument'

export default async function Page() {
  const membersByInstrument = await getMembersByInstrument()
  const instrumentsByFamily = await getInstrumentsByFamily()

  return (
    <MembersScreen
      instrumentsByFamily={instrumentsByFamily}
      membersByInstrument={membersByInstrument}
    />
  )
}
