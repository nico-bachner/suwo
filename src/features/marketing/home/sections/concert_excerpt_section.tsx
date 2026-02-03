import { Section } from '@/design_system/section'

const EMBED_URL = 'https://www.youtube.com/embed/pSd5_ZkcfP8'

export const ConcertExcerptSection = () => (
  <Section className="prose mx-auto w-full max-w-screen-lg">
    <h2>
      An excerpt from <em>Resistance and Rebellion</em>, SUWO&apos;s 2025
      Semester 2 concert
    </h2>

    <iframe
      src={EMBED_URL}
      title="SUWO Resistance and Rebellion Concert – Star Wars"
      allow="fullscreen"
      loading="lazy"
      className="aspect-video w-full rounded-3xl brightness-75 outline-none"
    />
  </Section>
)
 