import { SVGAttributes } from 'react'

import { STROKE_WIDTH } from './config'

export const FacebookIcon = ({
  fill = 'none',
  strokeWidth = STROKE_WIDTH,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...props
}: SVGAttributes<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    strokeWidth={strokeWidth}
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
