import { PageLayout } from '@/components/ui/page_layout'

export default function Loading() {
  return (
    <PageLayout
      title="Loading"
      subtitle="Please wait..."
      className="prose flex flex-col gap-6"
    />
  )
}
