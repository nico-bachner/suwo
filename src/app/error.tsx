'use client'

import { useEffect } from 'react'

import { Button } from '@/design_system/button'
import { ErrorFileProps } from '@/utils/next_types'

export default function Error({ error, reset }: ErrorFileProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <main className="prose">
      <h1>Something went wrong!</h1>

      <Button variant="primary" onClick={reset}>
        Try again
      </Button>
    </main>
  )
}
