import { cn } from '@/utils/cn'

import { SkeletonProps } from './types'

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      'bg-neutral-4 h-full w-full animate-pulse rounded-lg',
      className,
    )}
  />
)
