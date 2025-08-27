import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { fetchEvents } from '@/lib/data/fetch_events'
import { fetchUsers } from '@/lib/data/fetch_users'
import { EventAttendeesPage } from '@/lib/pages/event_attendees_page'
import { queryKeys } from '@/lib/queries'

export const generateStaticParams = async () => await fetchEvents()

export default async function Page({
  params,
}: PageProps<'/events/[id]/attendees'>) {
  const { id } = await params

  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.USERS(),
      queryFn: fetchUsers,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventAttendeesPage id={id} />
    </HydrationBoundary>
  )
}
