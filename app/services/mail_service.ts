import mail from '@adonisjs/mail/services/main'

export default class MailService {
    static async sendResetPassword(email: string, name: string, resetLink: string) {
        await mail.send((message) => {
            message
                .to(email)
                .from(process.env.MAIL_FROM_ADDRESS!)
                .subject('Reset Password')
                .html(`
          <h3>Hello ${name}</h3>
          <p>Click below to reset your password:</p>
          <a href="${resetLink}">Reset Password</a>
          <p>This link expires in 15 min.</p>
        `)
        })
    }
}