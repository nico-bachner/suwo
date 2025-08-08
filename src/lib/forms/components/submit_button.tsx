'use client'

import { Button } from '@/design_system/button'
import { Spinner } from '@/design_system/spinner'
import { useFormContext } from '@/lib/forms/context'

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
