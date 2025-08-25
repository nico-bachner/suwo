import { Session } from '@/generated/prisma'

import { SessionDTO } from './session_dto_validator'

/**
 * Transforms the database representation of a Session (including nested tables
 * via joins) into a Session Data Transfer Object (DTO).
 */
export const getSessionDTO = (session: Session): SessionDTO => ({
  // ID
  id: session.id,

  // Required Attributes
  user_id: session.user_id,

  // Metadata
  created_at: session.created_at.toISOString(),
  updated_at: session.updated_at.toISOString(),
})
