import { EventPage } from '@/lib/pages/event_page'
import { EventValidator } from '@/lib/validators/event_validator'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { id } = EventValidator.pick({ id: true }).parse(await params)

  return <EventPage id={id} />
}
