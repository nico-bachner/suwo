import { PrismaNeon } from '@prisma/adapter-neon'

import { PrismaClient } from '@/generated/prisma'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export default prisma
