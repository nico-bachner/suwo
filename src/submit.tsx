'use client'

import { useFormStatus } from 'react-dom'

type SubmitProps = {
  className?: string
}

export const Submit = ({ className }: SubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className={className}>
      Submit
    </button>
  )
}
