import Link from 'next/link'

import { LoginScreen } from '@/features/auth/login_screen'
import { LoginScreenSearchParamsValidator } from '@/features/auth/login_screen_search_params_validator'
import { routes } from '@/routes'
import { PageProps } from '@/types'

export default async function Page({ searchParams }: PageProps) {
  const { data } = LoginScreenSearchParamsValidator.safeParse(
    await searchParams,
  )

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>Log In</h1>

      <LoginScreen method={data?.method} />

      <p>
        Don&apos;t have an account? <Link href={routes.REGISTER}>Register</Link>{' '}
        instead
      </p>
    </div>
  )
}
