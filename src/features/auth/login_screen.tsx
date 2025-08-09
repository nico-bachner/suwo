import Link from 'next/link'

import { Button } from '@/design_system/button'
import { LoginWithMagicLinkForm } from '@/lib/forms/login_with_magic_link_form'
import { LoginWithPasswordForm } from '@/lib/forms/login_with_password_form'
import { cn } from '@/utils/cn'

import { LoginMethod } from './login_method'
import { LoginScreenSearchParams } from './login_screen_search_params_validator'
import { routes } from './routes'

export const LoginScreen = ({
  method,
  className,
}: LoginScreenSearchParams & {
  className?: string
}) => {
  switch (method) {
    case LoginMethod.MAGIC_LINK:
      return (
        <div className={cn(className)}>
          <LoginWithMagicLinkForm />
        </div>
      )
    case LoginMethod.PASSWORD:
      return (
        <div className={cn(className)}>
          <LoginWithPasswordForm />
        </div>
      )
    default:
      return (
        <div className={cn('flex flex-col gap-4', className)}>
          <Button asChild variant="primary">
            <Link href={routes.LOGIN({ method: LoginMethod.MAGIC_LINK })}>
              Log in with Magic Link
            </Link>
          </Button>
          <Button variant="secondary">
            <Link href={routes.LOGIN({ method: LoginMethod.PASSWORD })}>
              Log in with Password
            </Link>
          </Button>
        </div>
      )
  }
}
