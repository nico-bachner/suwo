type ResetPasswordTemplateProps = {
  link: string
}

export const ResetPasswordTemplate = ({ link }: ResetPasswordTemplateProps) => (
  <div>
    <h1>Reset Your Password</h1>

    <p>
      Click the link below to reset your password:
      <br />
      <a href={link}>{link}</a>
    </p>
  </div>
)
