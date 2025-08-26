type CreateURLParams = {
  path: (string | number)[]
  query?: Record<string, string | number | boolean | undefined>
}

export const createURL = ({ path, query }: CreateURLParams) => {
  const url = `/${path.join('/')}`

  if (!query) {
    return url
  }

  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, String(value))
    }
  })

  return [url, searchParams.toString()].join('?')
}
