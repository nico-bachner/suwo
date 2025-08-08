import Link from 'next/link'

import { Button } from '@/design_system/button'
import { Heading } from '@/design_system/typography'
import { LoginScreen } from '@/features/auth/login_screen'
import { LoginScreenSearchParamsValidator } from '@/features/auth/login_screen_search_params_validator'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ searchParams }: PageFileProps) {
  const { method } = LoginScreenSearchParamsValidator.parse(await searchParams)

  return (
    <main
      className={cn(
        'mx-auto w-full max-w-screen-lg',
        'grid grid-cols-1 items-center gap-8 sm:grid-cols-2',
      )}
    >
      <div className="flex flex-col gap-8">
        {method && (
          <Button asChild variant="secondary" className="self-start">
            <Link href={routes.LOGIN()}>← Back to Login Options</Link>
          </Button>
        )}

        <Heading as="h1" variant="primary">
          Log In
        </Heading>

        <p>
          Don&apos;t have an account?{' '}
          <Link
            href={routes.REGISTER()}
            className="text-primary-2 outline-none hover:underline focus:underline"
          >
            Register
          </Link>{' '}
          instead
        </p>
      </div>

      <LoginScreen method={method} />
    </main>
  )
}
