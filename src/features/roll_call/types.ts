import { Member, RollCall, Table } from '@/lib/db/types'

export type RollCallDate = Omit<RollCall, 'member'>

export type RollCallEntryProps = Omit<RollCall, 'member'> &
  Member & {
    present?: boolean
  }

export type RollCallScreenProps = RollCallDate & {
  rollCallEntries: Table<
    Member & {
      present?: boolean
    }
  >
}
