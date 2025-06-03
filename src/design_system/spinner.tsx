import { SpinnerIcon } from '@/icons/Spinner'
import { cn } from '@/utils/cn'

type SpinnerProps = {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => (
  <SpinnerIcon className={cn('animate-spin', className)} />
)
