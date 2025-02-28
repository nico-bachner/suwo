import { notFound } from 'next/navigation'

import { Params } from '@/types/next'

import { getHistory } from '../get_history'

type PageProps = {
  params: Params<{
    year: string
  }>
}

export default async function Page({ params }: PageProps) {
  const data = await getHistory()
  const { year: yearParam } = await params

  const year = data.find(
    ({ properties }) =>
      properties['Year'].type == 'number' &&
      properties['Year'].number == parseInt(yearParam),
  )

  if (!year) {
    return notFound()
  }

  return (
    <main className="prose">
      <h1>
        {year.properties['Year'].type == 'number' &&
          year.properties['Year'].number}
      </h1>
    </main>
  )
}

export const generateStaticParams = async () => {
  const data = await getHistory()

  return data
    .map(
      ({ properties }) =>
        properties['Year'].type == 'number' && properties['Year'].number,
    )
    .filter((number) => number)
    .map((year) => ({
      year: year?.toString(),
    }))
}
