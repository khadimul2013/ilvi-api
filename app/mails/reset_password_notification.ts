import { BaseMail } from '@adonisjs/mail'

export default class ResetPasswordNotification extends BaseMail {
  subject = 'Reset Password'

  constructor(
    private email: string,
    private name: string,
    private resetLink: string
  ) {
    super()
  }

  prepare() {
    this.message
      .to(this.email)
      .subject(this.subject)
      .html(`
        <h3>Hello ${this.name}</h3>
        <p>Click below to reset your password:</p>
        <a href="${this.resetLink}">Reset Password</a>
        <p>This link expires in 15 min.</p>
      `)
      .text(
        [
          `Hello ${this.name}`,
          'Click the link below to reset your password:',
          this.resetLink,
          'This link expires in 15 min.',
        ].join('\n\n')
      )
  }
}
