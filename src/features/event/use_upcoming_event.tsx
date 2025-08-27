import { useSuspenseQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'

export const useCurrentEvent = () => {
  const { data: events } = useSuspenseQuery(queries.EVENTS())

  /**
   * The api returns events sorted by start date in ascending order. We want to
   * find the most recent event that has already started, which is the last
   * event in the list that has a start date before the current date.
   */
  const currentEvent = events.findLast(
    (event) => new Date(event.starts_at).getTime() < Date.now(),
  )

  if (!currentEvent) {
    return null
  }

  return currentEvent
}
