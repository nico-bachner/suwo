import { Instrument, Prisma, User } from '@/generated/prisma'

import { UserDTO } from './user_dto_validator'

type UserDB = Omit<User, 'password'> & {
  instruments: Pick<Instrument, 'id'>[]
}

/**
 * Transforms the database representation of a User (including nested tables via
 * joins) into a User Data Transfer Object (DTO).
 */
export const getUserDTO = (user: UserDB): UserDTO => ({
  // ID
  id: user.id,

  // Required Attributes
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,
  instruments: user.instruments.map((instrument) => instrument.id),

  // Optional Attributes
  family_name: user.family_name,
  usu_number: user.usu_number,

  // Metadata
  created_at: user.created_at.toISOString(),
  updated_at: user.updated_at.toISOString(),
})

/**
 * Creates a new User object for insertion into the database. Used in POST
 * requests to create a new user.
 */
export const createUser = (
  user: Omit<UserDTO, 'id' | 'created_at' | 'updated_at'>,
): Omit<Prisma.UserCreateArgs['data'], 'id' | 'created_at' | 'updated_at'> => ({
  // Required Attributes
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,
  instruments: {
    connect: user.instruments.map((instrument) => ({
      id: instrument,
    })),
  },

  // Optional Attributes
  family_name: user.family_name,
  usu_number: user.usu_number,
})

/**
 * Updates an existing User object for insertion into the database. Used in
 * PATCH requests to update user information.
 */
export const updateUser = (
  user: Partial<Omit<UserDTO, 'id' | 'created_at' | 'updated_at'>>,
): Partial<
  Omit<Prisma.UserUpdateArgs['data'], 'id' | 'created_at' | 'updated_at'>
> => ({
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,
  instruments: {
    connect: user.instruments?.map((instrument) => ({
      id: instrument,
    })),
  },
  family_name: user.family_name,
  usu_number: user.usu_number,
})
