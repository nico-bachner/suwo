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
  <div className={cn('flex flex-col', className)}>
    <label htmlFor={name} className="px-2 py-1 text-sm text-gray-300">
      {label}
    </label>

    <input
      type={type}
      name={name}
      id={name}
      className="rounded-md border border-gray-500 bg-gray-950 px-2 py-1 focus:border-gray-300 focus:outline-none"
      {...props}
    />

    {errors?.map((error) => (
      <p key={error} className="px-2 py-1 text-sm text-red-500">
        {error}
      </p>
    ))}
  </div>
)
