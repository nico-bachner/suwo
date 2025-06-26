import Link from 'next/link'

import { Button } from '@/design_system/button'
import { LoginWithMagicLinkForm } from '@/features/auth/login_with_magic_link_form'

import { LoginScreenSearchParams } from './login_screen_search_params_validator'
import { LoginWithPasswordForm } from './login_with_password_form'
import { routes } from './routes'

export const LoginScreen = ({ method }: LoginScreenSearchParams) => (
  <div className="prose mx-auto max-w-screen-sm px-4 py-8">
    <h1>Log In</h1>

    {method ? (
      <div className="flex flex-col gap-4">
        {method === 'MAGIC_LINK' ? (
          <LoginWithMagicLinkForm />
        ) : (
          <LoginWithPasswordForm />
        )}

        <p>
          Don&apos;t have an account?{' '}
          <Link
            href={routes.REGISTER}
            className="font-bold text-blue-500 hover:underline"
          >
            Register
          </Link>{' '}
          instead
        </p>
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        <Button asChild variant="primary">
          <Link href={routes.LOGIN({ method: 'MAGIC_LINK' })}>
            Log in with Magic Link
          </Link>
        </Button>
        <Button variant="secondary">
          <Link href={routes.LOGIN({ method: 'PASSWORD' })}>
            Log in with Password
          </Link>
        </Button>
      </div>
    )}
  </div>
)
