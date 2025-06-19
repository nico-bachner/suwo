import { API_INDENT_SIZE } from '@/config'
import { getInstruments } from '@/lib/db/instruments/get'

export const GET = async () => {
  const instruments = await getInstruments()

  const json = JSON.stringify(instruments, null, API_INDENT_SIZE)

  return new Response(json)
}
