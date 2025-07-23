import Fuse from 'fuse.js'

type SearchParams<T> = {
  data: T[]
  keys: string[]
  query: string
}

export const search = <T>({ data, keys, query }: SearchParams<T>) =>
  query.length > 0
    ? new Fuse(data, {
        keys,
      })
        .search(query)
        .map(({ item }) => item)
    : data
