import { Semester } from '@/utils/date_manupulation'

export type Table<T> = T[]
type Public<T, K extends keyof T> = {
  [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: null
}

export type VerificationToken = {
  member: number
  token: string
  created_at: Date
}

export type Instrument = {
  name: string
  family: string
}

export type Member = {
  id: number
  given_name: string
  family_name: string | null
  email: string
  password: string
  usu: number | null
  instrument: Instrument['name'] | null
  mailing_list: boolean
}

export type Profile = Public<
  Member,
  'id' | 'given_name' | 'family_name' | 'instrument'
>

export type RollCall = {
  year: number
  semester: Semester
  week: number
  member: number
}

export type Piece = {
  id: string
  title: string
  composer: string
  year: number
  arranger?: string
  notes?: string
  date_purchased?: Date
  expiry?: Date
  price?: number
}

export type PracticePart = {
  piece: string
  url: string
  instrument: string
}
export type PracticePartFull = {
  id: string
  piece: Piece
  url: string
  instrument: Instrument
}

export type Equipment = {
  id: string
  name: string
  description?: string
  inventory: number
  condition?: string
  condition_description?: string
  acquisition_date?: Date
  acquisition_price?: number
  image?: string
}
