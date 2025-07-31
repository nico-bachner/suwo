import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

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
      'border-neutral-4 bg-neutral-7/50 flex flex-col gap-6 rounded-xl border p-6',
      className,
    )}
  >
    <div className="prose flex-1">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>

    {children}
  </section>
)
