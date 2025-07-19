'use client'

import { useEffect } from 'react'

import { Button } from '@/design_system/button'
import { ErrorFileProps } from '@/types'

export default function Error({ error, reset }: ErrorFileProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-4 p-4">
      <h2 className="font-serif text-3xl font-bold">Something went wrong!</h2>

      <Button variant="primary" onClick={reset} className="self-center">
        Try again
      </Button>
    </div>
  )
}
