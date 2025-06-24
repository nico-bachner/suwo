'use server'

import { redirect } from 'next/navigation'

import { deleteSession } from './session/create_session'

export const logOut = async () => {
  await deleteSession()
  redirect('/login')
}
