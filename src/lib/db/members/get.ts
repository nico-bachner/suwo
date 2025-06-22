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


export const getActiveMembersWithInstruments = async () => {
  const sql = getQueryBuilder()
  const currentYear = new Date().getFullYear();

  const members = await sql`
    SELECT members.id, members.given_name, members.family_name, members.instrument
    FROM members
    INNER JOIN roll_call ON members.id = roll_call.member
    WHERE members.instrument IS NOT NULL
    AND (roll_call.year = ${currentYear} OR (roll_call.year = ${currentYear - 1} AND roll_call.semester = 2))
    GROUP BY members.id, members.given_name, members.family_name, members.instrument
    HAVING COUNT(roll_call.member) > 0
    ORDER BY members.given_name, members.family_name

  `

  return members as Table<
    Omit<Profile, 'instrument'> & { instrument: Instrument['name'] }
  >
}
