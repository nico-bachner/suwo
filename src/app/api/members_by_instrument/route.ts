import { getMembersByInstrument } from '@/features/members/get_members_by_instrument'

export const GET = async () => {
  const membersByInstrument = await getMembersByInstrument()

  const json = JSON.stringify(membersByInstrument, null, 2)

  return new Response(json)
}
