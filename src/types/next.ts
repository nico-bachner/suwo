export type Params<T> = Promise<T>

export type SearchParams<T> = Promise<{
  [key in keyof T]: string
}>
