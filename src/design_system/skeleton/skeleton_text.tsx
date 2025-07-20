import { cn } from '@/utils/cn'

import { Skeleton } from './skeleton'
import { SkeletonTextProps } from './types'

export const SkeletonText = ({
  className,
  lines: numberOfLines = 1,
}: SkeletonTextProps) => (
  <div className="flex flex-col gap-1">
    {Array.from({ length: numberOfLines }).map((_, index) => (
      <Skeleton
        key={index}
        className={cn(
          index === numberOfLines - 1 ? 'w-2/3' : 'w-full',
          className,
        )}
      />
    ))}
  </div>
)
