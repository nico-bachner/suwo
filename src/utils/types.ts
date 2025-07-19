export type NextParams<T> = Promise<{
  [key in keyof T]?: string
}>

export type NextSearchParams<T> = Promise<{
  [key in keyof T]?: string
}>
