'use client'

import { useFormStatus } from 'react-dom'

type SubmitProps = {
  className?: string
  content?: string 
}

export const Submit = ({ className, content }: SubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className={className}>
      {content ?? 'Submit'}
    </button>
  )
}
