import Link from 'next/link'

import { Button } from '@/design_system/button'
import { LoginWithMagicLinkForm } from '@/lib/forms/login_with_magic_link_form'
import { LoginWithPasswordForm } from '@/lib/forms/login_with_password_form'
import { routes } from '@/lib/routes'
import { cn } from '@/utils/cn'

import { LoginMethod } from './login_method_validator'

type LoginScreenProps = {
  method?: LoginMethod
  className?: string
}

export const LoginScreen = ({ method, className }: LoginScreenProps) => {
  switch (method) {
    case 'magic_link':
      return (
        <div className={cn(className)}>
          <LoginWithMagicLinkForm />
        </div>
      )
    case 'password':
      return (
        <div className={cn(className)}>
          <LoginWithPasswordForm />
        </div>
      )
    default:
      return (
        <div className={cn('flex flex-col gap-4', className)}>
          <Button asChild variant="primary">
            <Link href={routes.LOGIN('magic_link')}>
              Receive a confirmation link by email
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={routes.LOGIN('password')}>
              Use a Password (if you have set one)
            </Link>
          </Button>
        </div>
      )
  }
}
