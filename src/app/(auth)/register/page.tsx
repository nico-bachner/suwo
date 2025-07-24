import Link from 'next/link'

import { PageContainer } from '@/design_system/container'
import { RegisterForm } from '@/features/auth/register_form'
import { routes } from '@/routes'

export default function Page() {
  return (
    <PageContainer size="sm" className="prose">
      <h1>Register</h1>

      <RegisterForm />

      <p>
        Already have an account? <Link href={routes.LOGIN()}>Log in</Link>{' '}
        instead
      </p>
    </PageContainer>
  )
}
