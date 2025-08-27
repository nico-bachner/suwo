import { prisma } from '@/utils/prisma'

import { getEventDTO } from '../dtos/event_dto'

export const fetchEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      starts_at: 'asc',
    },
    include: {
      attendees: true,
    },
  })

  return events.map(getEventDTO)
}
