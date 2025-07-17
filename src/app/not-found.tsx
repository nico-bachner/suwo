import Link from 'next/link'

import { Button } from '@/design_system/button'

export default function NotFound() {
  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>404</h1>
      <p>Page not found</p>
      <p>{"The page you're looking for doesn't exist."}</p>
      <Button variant="primary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  )
}
