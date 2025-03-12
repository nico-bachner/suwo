export type Table<T> = T[]

export type Member = {
  id: number
  given_name: string
  family_name: string | null
  email: string
  usu: number | null
  instrument: string | null
  mailing_list: boolean
}

export type Profile = Pick<
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
