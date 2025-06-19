import { API_INDENT_SIZE } from '@/config'
import { getInstrumentsByFamily } from '@/features/members/get_instruments_by_family'

export const GET = async () => {
  const instrumentsByFamily = await getInstrumentsByFamily()

  const json = JSON.stringify(instrumentsByFamily, null, API_INDENT_SIZE)

  return new Response(json)
}
