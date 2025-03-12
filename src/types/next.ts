export type Params<T> = Promise<{
  [key in keyof T]: string
}>

export type SearchParams<T> = Promise<{
  [key in keyof T]: string
}>
