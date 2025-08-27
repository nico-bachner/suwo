import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { fetchUsers } from '@/lib/data/fetch_users'
import { ProfilesPage } from '@/lib/pages/profiles_page'
import { queryKeys } from '@/lib/queries'

export const dynamic = 'error'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.USERS(),
    queryFn: fetchUsers,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilesPage />
    </HydrationBoundary>
  )
}
