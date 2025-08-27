import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { fetchInstruments } from '@/lib/data/fetch_instruments'
import { fetchUser } from '@/lib/data/fetch_user'
import { fetchUsers } from '@/lib/data/fetch_users'
import { ProfilePage } from '@/lib/pages/profile_page'
import { queryKeys } from '@/lib/queries'
import { GenerateStaticParams } from '@/utils/next'

export const generateStaticParams: GenerateStaticParams<
  '/members/[id]'
> = async () => {
  const users = await fetchUsers()

  return users
}

export default async function Page({ params }: PageProps<'/members/[id]'>) {
  const { id } = await params

  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.USER(id),
      queryFn: () => fetchUser(id),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.INSTRUMENTS(),
      queryFn: fetchInstruments,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage id={id} />
    </HydrationBoundary>
  )
}
