import { User } from '@/generated/prisma'
import { prisma } from '@/utils/prisma'

import { getUserDTO } from '../dtos/user_dto'

export const fetchUser = async (id: User['id']) => {
  const [user, events] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        events: true,
        instruments: true,
      },
    }),
    prisma.event.findMany({
      where: {
        starts_at: {
          lt: new Date(),
        },
      },
    }),
  ])

  if (!user) {
    return null
  }

  return getUserDTO(user, events)
}
