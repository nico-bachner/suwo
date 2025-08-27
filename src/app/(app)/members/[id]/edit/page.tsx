import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { fetchInstruments } from '@/lib/data/fetch_instruments'
import { fetchUser } from '@/lib/data/fetch_user'
import { ProfileEditPage } from '@/lib/pages/profile_edit_page'
import { queryKeys } from '@/lib/queries'

export const dynamic = 'error'

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
      <ProfileEditPage id={id} />
    </HydrationBoundary>
  )
}
