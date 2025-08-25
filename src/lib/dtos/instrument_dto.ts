import { Instrument, Prisma, User } from '@/generated/prisma'

import { InstrumentDTO, InstrumentInput } from './instrument_dto_validator'

/**
 * Transforms the database representation of an Instrument (including nested
 * tables via joins) into an Instrument Data Transfer Object (DTO).
 */
export const getInstrumentDTO = (
  instrument: Instrument & {
    players: Pick<User, 'id'>[]
  },
): InstrumentDTO => ({
  // ID
  id: instrument.id,

  // Required Attributes
  name: instrument.name,

  // Relations
  players: instrument.players.map((player) => player.id),

  // Metadata
  created_at: instrument.created_at.toISOString(),
  updated_at: instrument.updated_at.toISOString(),
})

/**
 * Transforms the input Instrument Data Transfer Object (DTO) into a format
 * suitable for database insertion. Used in POST requests to create a new
 * instrument.
 */
export const createInstrument = (
  instrument: InstrumentInput,
): Prisma.InstrumentCreateArgs['data'] => ({
  // Required Attributes
  name: instrument.name,

  // Relations
  players: instrument.players && {
    connect: instrument.players.map((id) => ({ id })),
  },
})
