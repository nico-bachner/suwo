import { cn } from '@/lib/cn'

import { Button } from './button'
import { Spinner } from './spinner'

type FormProps = React.ComponentProps<'form'> & {
  errors?: string[]
  message?: string
  pending?: boolean
  className?: string
}

export const Form = ({
  children,
  message = 'Submit',
  pending,
  errors,
  className,
  ...props
}: FormProps) => (
  <div className={cn('flex flex-col gap-1', className)}>
    <form className="flex flex-col gap-4" {...props}>
      {children}

      <Button variant="primary" disabled={pending} className="mt-4">
        {pending ? <Spinner className="h-6 w-6 stroke-gray-300" /> : message}
      </Button>
    </form>

    {errors && <p className="px-2 text-sm text-red-500">{errors[0]}</p>}
  </div>
)
