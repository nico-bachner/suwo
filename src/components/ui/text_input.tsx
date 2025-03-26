import { ZodIssue } from 'zod'

import { cn } from '@/lib/cn'

import { InputLabel } from './input_label'

type TextInputProps = React.ComponentProps<'input'> & {
  errors?: ZodIssue[]
  type?: 'text' | 'email' | 'password'
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
  <div className={cn('flex flex-col gap-1', className)}>
    <InputLabel label={label} htmlFor={name} required={required} />

    <input
      type={type}
      name={name}
      id={name}
      className="rounded-md border border-gray-500 bg-gray-950 px-3 py-2 placeholder:text-gray-500 focus:border-gray-300 focus:outline-none"
      {...props}
    />

    {errors?.map(({ message }) => (
      <p key={message} className="px-2 text-sm text-red-500">
        {message}
      </p>
    ))}
  </div>
)
