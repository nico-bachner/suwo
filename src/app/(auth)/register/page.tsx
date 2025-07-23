import Link from 'next/link'

import { RegisterForm } from '@/features/auth/register_form'
import { routes } from '@/routes'

export default function Page() {
  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>Register</h1>

      <RegisterForm />

      <p>
        Already have an account? <Link href={routes.LOGIN()}>Log in</Link>{' '}
        instead
      </p>
    </div>
  )
}
