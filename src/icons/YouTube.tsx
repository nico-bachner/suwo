export const YouTubeIcon = ({
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
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
)
