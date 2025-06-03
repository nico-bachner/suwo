import { ComponentType, SVGProps } from 'react'

export type IconSize = 'sm' | 'md' | 'lg'

export type IconProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  size: IconSize
  className?: string
}
