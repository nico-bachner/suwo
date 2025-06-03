import { getInstrumentsByFamily } from '@/features/members/get_instruments_by_family'

export const GET = async () => {
  const instrumentsByFamily = await getInstrumentsByFamily()

  const json = JSON.stringify(instrumentsByFamily, null, 2)

  return new Response(json)
}
