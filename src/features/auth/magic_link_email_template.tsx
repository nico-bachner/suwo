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
  callbackURL: string
}

export const MagicLinkEmailTemplate = ({
  callbackURL,
}: MagicLinkTemplateProps) => (
  <Html>
    <Head />

    <Tailwind>
      <Body className="px-2 font-sans">
        <Preview>Log in to your SUWO account</Preview>

        <Container>
          <Section>
            <Text>
              Someone recently attempted to login to your SUWO account. If this
              was you, please click the button below to log in.
            </Text>

            <Button
              href={callbackURL}
              className="rounded-full bg-amber-500 px-4 py-2 text-white"
            >
              Log in to your account
            </Button>

            <Text>
              This link will expire in 24 hours. If you need a new link, please
              click the login with magic link button again to request a new one.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)
