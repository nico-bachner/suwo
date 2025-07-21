'use client'

import { useEffect } from 'react'

import { Button } from '@/design_system/button'
import { Prose } from '@/design_system/prose'
import { ErrorFileProps } from '@/utils/next_types'

export default function Error({ error, reset }: ErrorFileProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <Prose>
      <h1 className="font-serif text-3xl font-bold">Something went wrong!</h1>

      <Button variant="primary" onClick={reset} className="self-center">
        Try again
      </Button>
    </Prose>
  )
}
