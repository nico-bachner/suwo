import { prisma } from '@/utils/prisma'

import { getUserDTO } from '../dtos/user_dto'

export const fetchUsers = async () => {
  const [users, events] = await Promise.all([
    prisma.user.findMany({
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

  return users.map((user) => getUserDTO(user, events))
}
