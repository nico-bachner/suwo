export const SpinnerIcon = ({
  fill = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...props
}: React.SVGAttributes<SVGSVGElement>) => (
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
