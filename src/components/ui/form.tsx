import { cn } from '@/lib/cn'

type FormProps = React.ComponentProps<'form'> & {
  errors?: string[]
  className?: string
}

export const Form = ({ children, errors, className, ...props }: FormProps) => (
  <div className={cn('flex flex-col gap-1', className)}>
    <form className="flex flex-col gap-4" {...props}>
      {children}
    </form>

    {errors && <p className="px-2 text-sm text-red-500">{errors[0]}</p>}
  </div>
)
