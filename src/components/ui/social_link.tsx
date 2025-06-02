import { cn } from '@/utils/cn'

const sizes = {
  sm: 'h-6 w-6',
  lg: 'h-8 w-8',
}

type SocialLinkProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: string
  size?: keyof typeof sizes
}

export const SocialLink = ({
  icon: Icon,
  size = 'sm',
  ...props
}: SocialLinkProps) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    <Icon className={cn('stroke-gray-300 stroke-1', sizes[size])} />
  </a>
)
