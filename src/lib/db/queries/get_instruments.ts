import { getQueryBuilder } from '@/lib/db/query'
import { Instrument, Table } from '@/lib/db/types'

export const getInstruments = async () => {
  const sql = getQueryBuilder()

  const instruments = await sql`
    SELECT name, family
    FROM instruments
    ORDER BY family, name
  `

  return instruments as Table<Instrument>
}
