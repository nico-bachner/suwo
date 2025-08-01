'use client'

import { useFormContext } from '@/lib/forms/context'

import { Button } from './button/button'
import { Spinner } from './spinner'

export const SubmitButton = () => {
  const form = useFormContext()

  return (
    <form.Subscribe>
      {({ canSubmit, isSubmitting }) => (
        <Button
          type="submit"
          variant="primary"
          disabled={!canSubmit}
          className="self-stretch"
        >
          {isSubmitting ? (
            <Spinner className="stroke-neutral-3 h-6 w-6" />
          ) : (
            'Submit'
          )}
        </Button>
      )}
    </form.Subscribe>
  )
}
