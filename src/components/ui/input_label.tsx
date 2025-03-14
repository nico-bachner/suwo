type InputLabelProps = {
  label: string
  htmlFor: string
  required?: boolean
}

export const InputLabel = ({ label, required, ...props }: InputLabelProps) => (
  <label
    className="flex flex-row justify-between gap-2 px-2 text-sm text-gray-300 select-none"
    {...props}
  >
    <span>{label}</span>
    <span className="text-xs text-gray-500 uppercase">
      {required && 'required'}
    </span>
  </label>
)
