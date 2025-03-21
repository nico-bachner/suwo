import { getQueryBuilder } from '@/lib/db/query'
import { Instrument, Profile, Table } from '@/lib/db/types'

export const getMembers = async () => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT id, given_name, family_name, instrument
    FROM members
    ORDER BY given_name, family_name
  `

  return members as Table<Profile>
}

export const getMembersWithInstruments = async () => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT id, given_name, family_name, instrument
    FROM members
    WHERE instrument IS NOT NULL
    ORDER BY given_name, family_name
  `

  return members as Table<
    Omit<Profile, 'instrument'> & { instrument: Instrument['name'] }
  >
}
