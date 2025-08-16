import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

import { Heading } from './typography'

type SettingsSectionProps = {
  children: ReactNode
  title: string
  description: string
  className?: string
}

export const SettingsSection = ({
  children,
  title,
  description,
  className,
}: SettingsSectionProps) => (
  <section
    className={cn(
      'border-neutral-4/80 bg-neutral-5/50 flex flex-col gap-6 rounded-3xl border p-6 backdrop-blur',
      className,
    )}
  >
    <div className="flex flex-1 flex-col gap-4">
      <Heading as="h2" variant="secondary">
        {title}
      </Heading>
      <p className="text-lg">{description}</p>
    </div>

    {children}
  </section>
)
