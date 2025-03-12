type InputLabelProps = {
  label: string
  htmlFor: string
  required?: boolean
}

export const InputLabel = ({ label, required, ...props }: InputLabelProps) => (
  <label className="px-2 text-sm text-gray-300 select-none" {...props}>
    {label} {required && '*'}
  </label>
)
