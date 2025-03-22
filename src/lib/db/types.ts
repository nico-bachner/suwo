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
  family_name?: string
  email: string
  password?: string
  usu?: number
  instrument?: Instrument['name']
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
