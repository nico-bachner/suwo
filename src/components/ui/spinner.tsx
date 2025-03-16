import { SpinnerIcon } from '@/icons/Spinner'
import { cn } from '@/lib/cn'

type SpinnerProps = {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => (
  <SpinnerIcon className={cn('animate-spin', className)} />
)
