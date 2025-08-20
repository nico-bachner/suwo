import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from './config'

/**
 * **SERVER USE ONLY**
 *
 * Deletes the current session by removing the session cookie.
 *
 * @returns A promise that resolves when the session is deleted.
 */
export const deleteSession = async () => {
  const cookieStore = await cookies()

  cookieStore.delete(SESSION_COOKIE_NAME)
}
