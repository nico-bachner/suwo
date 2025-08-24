import { EventAttendeesPage } from '@/lib/pages/event_attendees_page'

export default async function Page({
  params,
}: PageProps<'/events/[id]/attendees'>) {
  const { id } = await params

  return <EventAttendeesPage id={id} />
}
