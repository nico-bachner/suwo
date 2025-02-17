export type Table<T> = T[]

export type Week = {
  year?: number
  semester?: number
  week?: number
}

export type History = {
  year?: number
  content?: string
}

export type Member = {
  id?: number
  usu?: number
  family_name?: string
  given_name?: string
}

export type RollCall = {
  year?: number
  semester?: number
  week?: number
  member?: number
  present?: boolean
}
