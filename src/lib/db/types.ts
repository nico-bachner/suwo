export type Table<T> = T[]
type Public<T, K extends keyof T> = {
  [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: null
}

export type Member = {
  id: number
  given_name: string
  family_name: string | null
  email: string
  password: string
  usu: number | null
  instrument: string | null
  mailing_list: boolean
}

export type Profile = Public<
  Member,
  'id' | 'given_name' | 'family_name' | 'instrument'
>

export type RollCall = {
  year: number
  semester: number
  week: number
  member: number
}

export type Instrument = {
  name: string
  family: string
}
