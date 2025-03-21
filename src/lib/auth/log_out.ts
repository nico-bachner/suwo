'use server'

import { redirect } from 'next/navigation'

import { deleteSession } from './session'

export const logOut = async () => {
  deleteSession()
  redirect('/login')
}
