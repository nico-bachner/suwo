import { cn } from '@/utils/cn'

import { IconProps } from './types'
import { getSize } from './utils/get_size'

export const Icon = ({ icon: Icon, size, className }: IconProps) => (
  <Icon className={cn('stroke-neutral-2 stroke-2', getSize(size), className)} />
)
