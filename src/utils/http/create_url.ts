import { getBaseURL } from './get_base_url'

type CreateURLParams = {
  path: (string | number)[]
  query?: Record<string, string | number | boolean>
}

export const createURL = ({ path, query }: CreateURLParams) => {
  const url = new URL(`/${path.join('/')}`, getBaseURL())

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, encodeURIComponent(value))
    })
  }

  return url.toString()
}
