type EmailTemplateProps = {
  name: string
}

export const EmailTemplate = ({ name }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
)
