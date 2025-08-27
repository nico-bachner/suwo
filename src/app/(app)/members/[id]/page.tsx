import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { fetchUser } from '@/lib/data/fetch_user'
import { ProfilePage } from '@/lib/pages/profile_page'
import { queryKeys } from '@/lib/queries'

export default async function Page({ params }: PageProps<'/members/[id]'>) {
  const { id } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.USER(id),
    queryFn: () => fetchUser(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage id={id} />
    </HydrationBoundary>
  )
}
