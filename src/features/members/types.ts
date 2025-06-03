import { Instrument, Profile } from '@/lib/db/types'

export type MemberScreenProps = {
  instrumentsByFamily: Record<string, Instrument[]>
  membersByInstrument: Record<string, Profile[]>
}
