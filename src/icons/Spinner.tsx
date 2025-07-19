import { SVGAttributes } from 'react'

import { STROKE_WIDTH } from './config'

export const SpinnerIcon = ({
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
    <path d="M 12 2 A 10 10 0 1 1 2 12" />
  </svg>
)
