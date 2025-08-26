import { hash } from 'argon2'

import { getUserAttendanceRate } from '@/features/user/get_user_attendance_rate'
import { Event, Instrument, Prisma, User } from '@/generated/prisma'

import { UserDTO, UserInput } from './user_dto_validator'

/**
 * Transforms the database representation of a User (including nested tables via
 * joins) into a User Data Transfer Object (DTO).
 */
export const getUserDTO = (
  user: User & {
    events: Pick<Event, 'id'>[]
    instruments: Pick<Instrument, 'id'>[]
  },
  events: Event[],
): UserDTO => ({
  // ID
  id: user.id,

  // Required Attributes
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,

  // Optional Attributes
  family_name: user.family_name,
  usu_number: user.usu_number,

  // Relations
  events: user.events.map((event) => event.id),
  instruments: user.instruments.map((instrument) => instrument.id),

  // Metadata
  attendance_rate: getUserAttendanceRate(user, events),
  created_at: user.created_at.toISOString(),
  updated_at: user.updated_at.toISOString(),
})

/**
 * Transforms the input User Data Transfer Object (DTO) into a format suitable
 * for database insertion. Used in POST requests to create a new user.
 */
export const createUser = async (
  user: UserInput,
): Promise<Prisma.UserCreateArgs['data']> => ({
  // Required Attributes
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,

  // Optional Attributes
  family_name: user.family_name ? user.family_name : null,
  password: user.password ? await hash(user.password) : null,
  usu_number: user.usu_number ? user.usu_number : null,

  // Relations
  events: user.events && {
    connect: user.events.map((id) => ({ id })),
  },
  instruments: user.instruments && {
    connect: user.instruments.map((id) => ({ id })),
  },
})

/**
 * Transforms the input partial User Data Transfer Object (DTO) into a format
 * suitable for database updates. Used in PATCH requests to update an existing
 * user.
 */
export const updateUser = async (
  user: Partial<UserInput>,
): Promise<Partial<Prisma.UserUpdateArgs['data']>> => ({
  // Required Attributes
  email: user.email,
  given_name: user.given_name,
  mailing_list_preference: user.mailing_list_preference,

  // Optional Attributes
  family_name: user.family_name ? user.family_name : null,
  password: user.password ? await hash(user.password) : null,
  usu_number: user.usu_number ? user.usu_number : null,

  // Relations
  events: user.events && {
    set: user.events.map((id) => ({ id })),
  },
  instruments: user.instruments && {
    set: user.instruments.map((id) => ({ id })),
  },
})
