'use client'

import { useEffect } from 'react'

import { Button } from '@/design_system/button'
import { PageContainer } from '@/design_system/container'
import { ErrorFileProps } from '@/utils/next_types'

export default function Error({ error, reset }: ErrorFileProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <PageContainer size="sm" className="prose">
      <h1 className="font-serif text-3xl font-bold">Something went wrong!</h1>

      <Button variant="primary" onClick={reset} className="self-center">
        Try again
      </Button>
    </PageContainer>
  )
}
