import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { fetchInstruments } from '@/lib/data/fetch_instruments'
import { fetchUsers } from '@/lib/data/fetch_users'
import { ProfilesPage } from '@/lib/pages/profiles_page'
import { queryKeys } from '@/lib/queries'

export const dynamic = 'error'

export default async function Page() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.USERS(),
      queryFn: fetchUsers,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.INSTRUMENTS(),
      queryFn: fetchInstruments,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilesPage />
    </HydrationBoundary>
  )
}
