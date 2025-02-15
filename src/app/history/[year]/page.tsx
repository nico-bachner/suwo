import { ContentPage } from '@/content_page'
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
    <ContentPage>
      <h1>{year}</h1>
      <p>{data[0].content}</p>
    </ContentPage>
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
