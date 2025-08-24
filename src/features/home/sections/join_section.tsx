import { Button } from '@/design_system/button'
import { Section } from '@/design_system/section'

const USU_URL = 'https://usu.edu.au/clubs/wind-orchestra/'

export const JoinSection = () => (
  <Section className="prose mx-auto w-full max-w-screen-sm">
    <h2>Become a member</h2>

    <p>
      In advance of the first rehearsal, please join our club through the{' '}
      <em>University of Sydney Union (USU)</em>. Not sure if we match your vibe?
      Come anyway, the first few weeks of each semester are free to attend.
    </p>

    <Button asChild variant="primary">
      <a href={USU_URL} target="_blank" rel="noopener noreferrer">
        Join via USU
      </a>
    </Button>
  </Section>
)
