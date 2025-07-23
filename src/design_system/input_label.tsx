type InputLabelProps = {
  label: string
  htmlFor: string
  required?: boolean
}

export const InputLabel = ({ label, required, ...props }: InputLabelProps) => (
  <label
    className="text-neutral-2 flex flex-row justify-between gap-2 px-2 text-sm select-none"
    {...props}
  >
    <span>{label}</span>
    <span className="text-neutral-3 text-xs uppercase">
      {required && 'required'}
    </span>
  </label>
)
