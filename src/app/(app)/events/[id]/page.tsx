import { EventBackButton } from '@/features/event/event_back_button'
import { EventNavigator } from '@/features/event/event_navigator'
import { EventPage } from '@/lib/pages/event_page'

export default async function Page({ params }: PageProps<'/events/[id]'>) {
  const { id } = await params

  return (
    <div className="md:pt-12">
      <EventNavigator
        id={id}
        className="fixed right-2 bottom-20 left-2 z-30 md:top-24"
      />

      <EventBackButton className="fixed right-2 bottom-32 left-2 z-30 md:top-38" />

      <EventPage id={id} />
    </div>
  )
}
