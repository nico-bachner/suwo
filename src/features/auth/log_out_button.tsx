'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { mutations, routes } from '@/routes'

export const LogOutButton = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(mutations.DELETE_SESSION(queryClient))

  const handleLogOut = () => {
    mutate()
    redirect(routes.HOME())
  }

  return (
    <Button variant="danger" onClick={handleLogOut}>
      Log Out
    </Button>
  )
}
