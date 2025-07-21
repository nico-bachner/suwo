'use client'

import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { routes } from '@/routes'

import { useDeleteSessionMutation } from './session/client/use_delete_session_mutation'

export const LogOutButton = () => {
  const { deleteSession } = useDeleteSessionMutation()

  const handleLogOut = async () => {
    await deleteSession()
    redirect(routes.HOME())
  }

  return (
    <Button variant="danger" onClick={handleLogOut}>
      Log Out
    </Button>
  )
}
