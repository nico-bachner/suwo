import { Event, User } from '@/generated/prisma'

export const getUserAttendanceRate = (
  user: User & {
    events: Pick<Event, 'id'>[]
  },
  events: Event[],
) => {
  const pastEventsSinceSemesterStart = events.filter((event) => {
    const eventDate = new Date(event.starts_at).getTime()
    const now = Date.now()

    const semesterStartCalc = (): Date => {
      const now = new Date()
      const month = now.getMonth()
      const year = now.getFullYear()

      return new Date(year, month <= 5 ? 0 : 6, 1)
    }

    const semesterStart = semesterStartCalc().getTime()

    return eventDate > semesterStart && eventDate < now
  })

  if (pastEventsSinceSemesterStart.length === 0) {
    return 100
  }

  const eventsAttendedSinceSemesterStart = pastEventsSinceSemesterStart.filter(
    (event) => user.events.some(({ id }) => id === event.id),
  )

  const ratio =
    eventsAttendedSinceSemesterStart.length /
    pastEventsSinceSemesterStart.length

  return Math.round(ratio * 100)
}
