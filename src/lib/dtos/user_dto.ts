import { User, UserInstrument } from '@/generated/prisma'

import { UserDTO } from './user_dto_validator'

type UserDB = User & {
  UserInstrument: Pick<UserInstrument, 'instrument_id'>[]
}

export const getUserDTO = (user: UserDB): UserDTO => ({
  // ID
  id: user.id,

  // Required Attributes
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,
  instruments: user.UserInstrument.map(({ instrument_id }) => instrument_id),

  // Optional Attributes
  family_name: user.family_name,
  usu_number: user.usu_number,

  // Metadata
  created_at: user.created_at.toISOString(),
  updated_at: user.updated_at.toISOString(),
})

export const parseUserDTO = (data: Partial<UserDTO>): Partial<UserDB> => ({
  // ID
  id: data.id,

  // Required Attributes
  email: data.email,
  given_name: data.given_name,
  mailing_list_preference: data.mailing_list_preference,
  UserInstrument: data.instruments?.map((instrument_id) => ({
    instrument_id,
  })),

  // Optional Attributes
  family_name: data.family_name,
  usu_number: data.usu_number,
})
