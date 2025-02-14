import Link from 'next/link'

const Page = () => (
  <main className="flex flex-col items-center gap-8 px-6 py-8">
    <h1 className="font-serif text-6xl font-extrabold">{`SUWO's History`}</h1>

    <Link href="/history/2013">2013</Link>
  </main>
)

export default Page
