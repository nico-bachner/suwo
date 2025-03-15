import { getInstruments } from '@/lib/db/instruments/get'

export const GET = async () => {
  const instruments = await getInstruments()

  const json = JSON.stringify(instruments, null, 2)

  return new Response(json)
}
