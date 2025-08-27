import { fetchEvents } from '@/lib/data/fetch_events'
import { EventPage } from '@/lib/pages/event_page'

export const generateStaticParams = async () => await fetchEvents()

export default async function Page({ params }: PageProps<'/events/[id]'>) {
  const { id } = await params

  return <EventPage id={id} />
}
