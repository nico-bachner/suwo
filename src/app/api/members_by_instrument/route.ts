import { API_INDENT_SIZE } from '@/config'
import { getMembersByInstrument } from '@/features/members/get_members_by_instrument'

export const GET = async () => {
  const membersByInstrument = await getMembersByInstrument()

  const json = JSON.stringify(membersByInstrument, null, API_INDENT_SIZE)

  return new Response(json)
}
