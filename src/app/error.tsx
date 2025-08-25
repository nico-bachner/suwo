'use client'

import { useEffect } from 'react'

import { Button } from '@/design_system/button'
import { ErrorProps } from '@/utils/next'

export default function Error({ error, reset }: ErrorProps) {
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
