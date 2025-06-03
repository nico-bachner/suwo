import { getMembersWithInstruments } from '@/lib/db/members/get'
import { Instrument, Profile } from '@/lib/db/types'

export const getMembersByInstrument = async () => {
  const members = await getMembersWithInstruments()

  const membersByInstrument = members.reduce<
    Record<Instrument['name'], Profile[]>
  >((accMembersByInstrument, member) => {
    if (!member.instrument) {
      return accMembersByInstrument
    }

    const instrumentExists = Object.keys(accMembersByInstrument).includes(
      member.instrument,
    )

    if (!instrumentExists) {
      return {
        ...accMembersByInstrument,
        [member.instrument]: [member],
      }
    }

    return {
      ...accMembersByInstrument,
      [member.instrument]: [
        ...accMembersByInstrument[member.instrument],
        member,
      ],
    }
  }, {})

  return membersByInstrument
}
