import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'

import { PrismaClient } from '@/generated/prisma'

dotenv.config()

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export default prisma
