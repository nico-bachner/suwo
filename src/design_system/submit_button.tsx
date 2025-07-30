import { Button } from './button/button'
import { Spinner } from './spinner'

type SubmitButtonProps = {
  canSubmit: boolean
  isSubmitting: boolean
}

export const SubmitButton = ({
  canSubmit,
  isSubmitting,
}: SubmitButtonProps) => (
  <Button type="submit" variant="primary" disabled={!canSubmit}>
    {isSubmitting ? <Spinner className="stroke-neutral-3 h-6 w-6" /> : 'Submit'}
  </Button>
)
