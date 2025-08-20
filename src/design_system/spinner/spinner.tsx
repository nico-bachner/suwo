import { SpinnerIcon } from '@/design_system/icons/spinner_icon'
import { cn } from '@/utils/cn'

type SpinnerProps = {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => (
  <SpinnerIcon
    className={cn('stroke-neutral-2 size-6 animate-spin', className)}
  />
)
