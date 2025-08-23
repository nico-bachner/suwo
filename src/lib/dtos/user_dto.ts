import { User } from '@/generated/prisma'

import { UserDTO } from './user_dto_validator'

export const getUserDTO = (user: User): UserDTO => ({
  // ID
  id: user.id,

  // Required Attributes
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,

  // Optional Attributes
  family_name: user.family_name,
  usu_number: user.usu_number,

  // Metadata
  created_at: user.created_at.toISOString(),
  updated_at: user.updated_at.toISOString(),
})
