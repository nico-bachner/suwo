import { Temporal } from '@js-temporal/polyfill'

import { Event, Prisma, User } from '@/generated/prisma'

import { EventDTO, EventInput } from './event_dto_validator'

/**
 * Transforms the database representation of an Event (including nested tables
 * via joins) into an Event Data Transfer Object (DTO).
 */
export const getEventDTO = (
  event: Event & {
    attendees: Pick<User, 'id'>[]
  },
): EventDTO => ({
  // ID
  id: event.id,

  // Required Attributes
  name: event.name,
  starts_at: event.starts_at.toISOString(),

  // Optional Attributes
  ends_at: event.ends_at && event.ends_at.toISOString(),
  location: event.location,
  notes: event.notes,
  type: event.type,

  // Relations
  attendees: event.attendees.map((attendee) => attendee.id),

  // Metadata
  created_at: event.created_at.toISOString(),
  updated_at: event.updated_at.toISOString(),
})

/**
 * Transforms the input Event Data Transfer Object (DTO) into a format suitable
 * for database insertion. Used in POST requests to create a new event.
 */
export const createEvent = (
  event: EventInput,
): Prisma.EventCreateArgs['data'] => ({
  // Required Attributes
  name: event.name,
  starts_at: new Date(
    Temporal.PlainDateTime.from(event.starts_at).toZonedDateTime(
      'Australia/Sydney',
    ).epochMilliseconds,
  ),

  // Optional Attributes
  ends_at: event.ends_at
    ? new Date(
        Temporal.PlainDateTime.from(event.ends_at).toZonedDateTime(
          'Australia/Sydney',
        ).epochMilliseconds,
      )
    : null,
  location: event.location,
  notes: event.notes,
  type: event.type,
})

/**
 * Transforms the input partial Event Data Transfer Object (DTO) into a format
 * suitable for database updates. Used in PATCH requests to update an existing
 * event.
 */
export const updateEvent = (
  event: Partial<EventInput>,
): Partial<Prisma.EventUpdateArgs['data']> => ({
  // Required Attributes
  name: event.name,
  starts_at:
    event.starts_at &&
    new Date(
      Temporal.PlainDateTime.from(event.starts_at).toZonedDateTime(
        'Australia/Sydney',
      ).epochMilliseconds,
    ),
  // Optional Attributes
  ends_at:
    event.ends_at &&
    new Date(
      Temporal.PlainDateTime.from(event.ends_at).toZonedDateTime(
        'Australia/Sydney',
      ).epochMilliseconds,
    ),
  location: event.location,
  notes: event.notes,
  type: event.type,

  // Relations
  attendees: event.attendees && {
    set: event.attendees.map((id) => ({ id })),
  },
})
