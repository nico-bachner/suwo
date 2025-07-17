import { AuthLayout } from '@/features/auth/auth_layout'
import { LayoutFileProps } from '@/types'

export default function Layout({ children }: LayoutFileProps) {
  return <AuthLayout>{children}</AuthLayout>
}
