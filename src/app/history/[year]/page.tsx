import { getQueryBuilder } from '@/neon'
import { History, Table } from '@/types/db'
import { Params } from '@/types/next'

type PageProps = {
  params: Params<Pick<History, 'year'>>
}

export default async function Page({ params }: PageProps) {
  const { year } = await params

  const sql = getQueryBuilder()
  const data: Table<History> =
    await sql`SELECT * FROM history WHERE year = ${year}`

  return (
    <main className="prose">
      <h1>{year}</h1>
      <p>{data[0].content}</p>
    </main>
  )
}

export const generateStaticParams = async () => {
  const sql = getQueryBuilder()
  const data: Table<Pick<History, 'year'>> =
    await sql`SELECT year FROM history ORDER BY year DESC`

  return data.map(({ year }) => ({
    year: year?.toString(),
  }))
}
