'use client'

import { Button } from '@/design_system/button'
import { Spinner } from '@/design_system/spinner'
import { useFormContext } from '@/lib/forms/context'
import { cn } from '@/utils/cn'

type SubmitButtonProps = {
  className?: string
}

export const SubmitButton = ({ className }: SubmitButtonProps) => {
  const form = useFormContext()

  return (
    <form.Subscribe>
      {({ canSubmit, isSubmitting }) => (
        <Button
          type="submit"
          variant="primary"
          disabled={!canSubmit}
          className={cn('w-full max-w-screen-sm self-center', className)}
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
