'use client'

/**
 * File contents taken from
 * https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
 */
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })

// eslint-disable-next-line init-declarations
let browserQueryClient: QueryClient | undefined

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

type QueryProviderProps = {
  children: React.ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
