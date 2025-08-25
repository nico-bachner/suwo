import { Section } from '@/design_system/section'

const EMBED_URL = 'https://www.youtube.com/embed/AerrE5gpIQo'

export const ConcertExcerptSection = () => (
  <Section className="prose mx-auto w-full max-w-screen-lg">
    <h2>
      An excerpt from <em>Myths and Legends</em>, SUWO&apos;s 2025 Semester 1
      concert
    </h2>

    <iframe
      src={EMBED_URL}
      title="SUWO Myths and Legends Concert – The Lord of the Rings"
      allow="fullscreen"
      loading="lazy"
      className="aspect-video w-full rounded-3xl brightness-75 outline-none"
    />
  </Section>
)
