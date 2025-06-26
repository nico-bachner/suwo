import { AuthLayout } from '@/features/auth/auth_layout'
import { LayoutProps } from '@/types'

export default function Layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>
}
