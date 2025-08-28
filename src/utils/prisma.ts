import { PrismaNeon } from '@prisma/adapter-neon'

import { PrismaClient } from '@/generated/prisma'

export const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  }),
})
