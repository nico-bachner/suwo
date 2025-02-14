import { History, Table } from '@/db'
import { getQueryBuilder } from '@/neon'

type PageProps = {
  params: Promise<{ year: string }>
}

export default async function Page({ params }: PageProps) {
  const { year } = await params

  const sql = getQueryBuilder()
  const data: Table<History> =
    await sql`SELECT * FROM history WHERE year = ${year}`

  return (
    <main className="prose p-6">
      <h2 className="text-2xl">{year}</h2>
      <p>{data[0].content}</p>
    </main>
  )
}

export const generateStaticParams = async () => {
  const sql = getQueryBuilder()
  const data: Table<Pick<History, 'year'>> = await sql`SELECT year FROM history`

  return data.map(({ year }) => ({
    year: year?.toString(),
  }))
}
