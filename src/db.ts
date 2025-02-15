export type Table<T> = T[]

export type History = {
  year?: number
  content?: string
}

export type Member = {
  id?: number
  name?: string
  usu?: number
}

export type RoleCall = {
  year?: number
  semester?: number
  week?: number
  member?: number
  present?: boolean
}
