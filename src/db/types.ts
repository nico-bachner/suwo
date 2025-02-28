export type Table<T> = T[]

export type Week = {
  year?: number
  semester?: number
  week?: number
}

export type Member = {
  id?: number
  family_name?: string
  given_name?: string
  usu?: number
  email?: string
  mailing_list?: boolean
}

export type RollCall = {
  year?: number
  semester?: number
  week?: number
  member?: number
  present?: boolean
}
