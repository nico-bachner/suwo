import { User } from '@/generated/prisma'

import { UserDTO } from './user_dto_validator'

export const getUserDTO = (user: User): UserDTO => ({
  id: user.id,

  email: user.email,
  mailing_list_preference: user.mailing_list_preference,

  created_at: user.created_at.toISOString(),
  updated_at: user.updated_at.toISOString(),
})
