import { User } from '@/generated/prisma'

export type Session = {
  user_id: User['id']
}
