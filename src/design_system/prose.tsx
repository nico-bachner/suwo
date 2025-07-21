import { ReactNode } from 'react'

type ProseProps = {
  children: ReactNode
}

export const Prose = ({ children }: ProseProps) => (
  <div className="prose mx-auto max-w-screen-sm px-4 py-8">{children}</div>
)
