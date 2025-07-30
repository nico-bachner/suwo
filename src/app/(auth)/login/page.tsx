import Link from 'next/link'

import { LoginScreen } from '@/features/auth/login_screen'
import { LoginScreenSearchParamsValidator } from '@/features/auth/login_screen_search_params_validator'
import { routes } from '@/routes'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ searchParams }: PageFileProps) {
  const { data } = LoginScreenSearchParamsValidator.safeParse(
    await searchParams,
  )

  return (
    <main className="prose">
      <h1>Log In</h1>

      <LoginScreen method={data?.method} />

      <p>
        Don&apos;t have an account?{' '}
        <Link href={routes.REGISTER()}>Register</Link> instead
      </p>
    </main>
  )
}
