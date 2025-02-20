import Link from 'next/link'

export default function Page() {
  return (
    <main className="prose text-center">
      <h1>404 – Page not found</h1>
      <p>{"The page you're looking for doesn't exist."}</p>
      <p>
        <Link href="/">Go back home</Link>
      </p>
    </main>
  )
}
