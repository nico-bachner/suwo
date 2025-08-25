import { cookies } from 'next/headers'

import { prisma } from '@/utils/prisma'

import { SESSION_COOKIE_NAME } from './config'
import { getSession } from './get_session'

/**
 * **SERVER USE ONLY**
 *
 * Deletes the current session by removing the session cookie.
 *
 * @returns A promise that resolves when the session is deleted.
 */
export const deleteSession = async (): Promise<void> => {
  const cookieStore = await cookies()

  const oldSession = await getSession()

  if (oldSession) {
    await prisma.session.delete({
      where: {
        id: oldSession.id,
      },
    })
  }

  cookieStore.delete(SESSION_COOKIE_NAME)
}
