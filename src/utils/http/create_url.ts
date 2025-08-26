import z from 'zod'

export const URLValidator = z.object({
  protocol: z.union([z.literal('http'), z.literal('https')]).optional(),
  host: z.string().optional(),
  path: z.array(z.union([z.string(), z.number()])),
  query: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean()]).optional(),
    )
    .optional(),
})

export const createURL = ({
  protocol,
  host,
  path,
  query,
}: z.infer<typeof URLValidator>): string => {
  if (protocol && host) {
    return `${protocol}://${host}${createURL({ path, query })}`
  }

  const url = `/${path.join('/')}`

  if (!query) {
    return url
  }

  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value))
    }
  })

  if (searchParams.toString() === '') {
    return url
  }

  return [url, searchParams.toString()].join('?')
}
