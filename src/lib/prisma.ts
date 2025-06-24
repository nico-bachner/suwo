/* eslint-disable */
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import ws from 'ws'

neonConfig.webSocketConstructor = ws
neonConfig.poolQueryViaFetch = true

declare global {
  var prisma: PrismaClient | undefined
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = global.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
