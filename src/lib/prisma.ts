import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import 'dotenv/config'
import ws from 'ws'

import { PrismaClient } from '@/generated/prisma'

neonConfig.webSocketConstructor = ws
neonConfig.poolQueryViaFetch = true

// eslint-disable-next-line no-undef
const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })

// eslint-disable-next-line typescript/no-unnecessary-condition
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
