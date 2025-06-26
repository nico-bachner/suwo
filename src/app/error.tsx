'use client'

// Error boundaries must be Client Components
import { useEffect } from 'react'

import { Button } from '@/design_system/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console, no-undef
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
