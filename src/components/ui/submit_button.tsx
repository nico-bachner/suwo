import { cn } from '@/lib/cn'

export const SubmitButton = ({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<'button'>, 'type'>) => (
  <button
    type="submit"
    className={cn(
      'cursor-pointer rounded-md bg-gray-800 px-4 py-2.5 text-gray-300 transition-colors select-none hover:bg-gray-700 focus:bg-gray-600 focus:outline-none',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
