import { EventNavigator } from '@/features/event/event_navigator'
import { EventValidator } from '@/lib/validators/event_validator'
import { LayoutFileProps } from '@/utils/next_types'

export default async function Layout({ children, params }: LayoutFileProps) {
  const { id } = EventValidator.pick({ id: true }).parse(await params)

  return (
    <div className="md:pt-12">
      <EventNavigator
        id={id}
        className="fixed right-2 bottom-20 left-2 z-30 md:top-24"
      />

      {children}
    </div>
  )
}
