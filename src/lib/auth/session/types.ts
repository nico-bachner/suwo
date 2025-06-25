import { User } from '@/generated/prisma'

export type Session = {
  id: User['id'] | null
}
