'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { Button } from '@/design_system/button'
import { mutations } from '@/mutations'
import { routes } from '@/routes'

export const LogOutButton = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(mutations.DELETE_SESSION(queryClient))

  return (
    <Button
      variant="danger"
      onClick={() => {
        mutate()
        redirect(routes.HOME())
      }}
    >
      Log Out
    </Button>
  )
}
