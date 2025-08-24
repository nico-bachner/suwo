import { EventPage } from '@/lib/pages/event_page'

export default async function Page({ params }: PageProps<'/events/[id]'>) {
  const { id } = await params

  return <EventPage id={id} />
}
