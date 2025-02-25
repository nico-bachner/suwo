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
  className,
  ...props
}: TextInputProps) => (
  <div className={cn('flex flex-col gap-1', className)}>
    <label htmlFor={name} className="text-sm text-gray-300">
      {label}
    </label>

    <input
      type={type}
      name={name}
      id={name}
      className="rounded border border-gray-500 bg-gray-900 px-2 py-1"
      {...props}
    />

    {errors?.map((error) => (
      <p key={error} className="text-sm text-red-500">
        {error}
      </p>
    ))}
  </div>
)
