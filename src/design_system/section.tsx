import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type SectionProps = {
  children: ReactNode
  className?: string
}

export const Section = ({ children, className }: SectionProps) => (
  <section
    className={cn(
      'border-neutral-2/20 bg-neutral-5/20 rounded-[36px] border p-6 backdrop-blur',
      className,
    )}
  >
    {children}
  </section>
)
