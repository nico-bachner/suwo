import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from '../config'

export const deleteSession = async () => {
  const cookieStore = await cookies()

  cookieStore.delete(SESSION_COOKIE_NAME)
}
