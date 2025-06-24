import { cookies } from 'next/headers'

export const deleteSession = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('session')
}
