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

type ResetPasswordTemplateProps = {
  link: string
}

export const ResetPasswordTemplate = ({ link }: ResetPasswordTemplateProps) => (
  <Html>
    <Head />

    <Tailwind>
      <Body className="px-2 font-sans">
        <Preview>Reset your password</Preview>

        <Container>
          <Section>
            <Text>
              Someone recently requested a password change for your SUWO
              account. If this was you, you can set a new password here:
            </Text>

            <Button
              href={link}
              className="rounded-lg bg-amber-500 px-4 py-2 text-white"
            >
              Reset password
            </Button>

            <Text>
              This link will expire in 24 hours. If you need a new link, please
              fill in the form again.
            </Text>

            <Text>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)
