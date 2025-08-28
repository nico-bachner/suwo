import { EventDTO } from '@/lib/dtos/event_dto_validator'

export const getUpcomingEvents = (events: EventDTO[]) =>
  events
    .filter((event) => {
      /**
       * Users intuitively consider events that are currently ongoing to fall
       * under upcoming events, so we include those.
       */
      if (event.ends_at) {
        return new Date(event.ends_at) >= new Date()
      }

      return new Date(event.starts_at) >= new Date()
    })
    .sort(
      (a, b) =>
        new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
    )
