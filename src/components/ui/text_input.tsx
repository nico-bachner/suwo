import { cn } from '@/cn'

type TextInputProps = React.ComponentProps<'input'> & {
  errors?: string[]
  type?: 'text' | 'email'
  name: string
  label: string
  className?: string
}

export const TextInput = ({
  errors,
  type = 'text',
  name,
  label,
  required,
  className,
  ...props
}: TextInputProps) => (
  <div className={cn('flex flex-col', className)}>
    <label
      htmlFor={name}
      className="px-2 py-1 text-sm text-gray-300 select-none"
    >
      {label}{' '}
      {required && (
        <span className={cn(errors && errors.length > 0 && 'text-red-500')}>
          *
        </span>
      )}
    </label>

    <input
      type={type}
      name={name}
      id={name}
      className="rounded-md border border-gray-500 bg-gray-950 px-3 py-2 placeholder:text-gray-500 focus:border-gray-300 focus:outline-none"
      {...props}
    />

    {errors?.map((error) => (
      <p key={error} className="px-2 py-1 text-sm text-red-500">
        {error}
      </p>
    ))}
  </div>
)
