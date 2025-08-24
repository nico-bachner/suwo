import { EventNavigator } from '@/features/event/event_navigator'

export default async function Layout({
  children,
  params,
}: LayoutProps<'/events/[id]'>) {
  const { id } = await params

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
