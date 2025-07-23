import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

type MagicLinkTemplateProps = {
  link: string
}

export const MagicLinkEmailTemplate = ({ link }: MagicLinkTemplateProps) => (
  <Html>
    <Head />

    <Tailwind>
      <Body className="px-2 font-sans">
        <Preview>Log in to your SUWO account</Preview>

        <Container size="sm">
          <Section>
            <Text>
              Someone recently attempted to login to your SUWO account. If this
              was you, please click the button below to log in.
            </Text>

            <Button
              href={link}
              className="rounded-lg bg-amber-500 px-4 py-2 text-white"
            >
              Log in to your account
            </Button>

            <Text>
              This link will expire in 24 hours. If you need a new link, please
              fill in the form again.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)
