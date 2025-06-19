import { ReactNode } from 'react'

type SettingsSectionProps = {
  children: ReactNode
  title: string
  description: string
}

export const SettingsSection = ({
  children,
  title,
  description,
}: SettingsSectionProps) => (
  <section className="flex flex-col gap-8 rounded-xl border border-gray-700 p-6">
    <div className="prose">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>

    {children}
  </section>
)
