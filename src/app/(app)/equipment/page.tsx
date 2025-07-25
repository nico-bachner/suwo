'use client'

import { useQuery } from '@tanstack/react-query'

import { PageContainer } from '@/design_system/container'
import { queries } from '@/lib/queries'

export default function Page() {
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())
  const {
    data: equipment,
    error: equipmentError,
    isPending: isEquipmentPending,
  } = useQuery(queries.EQUIPMENT())

  if (isSessionPending || isEquipmentPending) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Loading...</h1>
      </PageContainer>
    )
  }

  if (sessionError) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Error</h1>
        <p>{sessionError.message}</p>
      </PageContainer>
    )
  }

  if (equipmentError) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Error</h1>
        <p>{equipmentError.message}</p>
      </PageContainer>
    )
  }

  if (!session) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Not logged in</h1>
        <p>Please log in to view this page.</p>
      </PageContainer>
    )
  }

  if (equipment.length === 0) {
    return (
      <PageContainer size="sm" className="prose">
        <h1>Equipment</h1>
        <p>There are currently no equipment items available.</p>
      </PageContainer>
    )
  }

  return (
    <PageContainer size="sm" className="prose">
      <h1>Equipment</h1>
      <ul>
        {equipment.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.inventory} in stock
            <p>{item.description || 'No description available.'}</p>
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
