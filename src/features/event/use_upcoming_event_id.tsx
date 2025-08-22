import { useQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'

export const useUpcomingEventId = () => {
  const { data: events } = useQuery(queries.EVENTS())

  const upcomingEvent = events?.find(
    (event) => new Date(event.starts_at).getTime() > Date.now(),
  )

  if (upcomingEvent) {
    return upcomingEvent.id
  }

  return ''
}
