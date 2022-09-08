const nodemailer = require("nodemailer");

class EmailService {
  transporter;
  static init() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    });
  }
  static async sendEmail(to, subject, text, html) {
    const from = process.env.EMAIL_USER;
    await this.transporter.sendMail({ from, to, subject, text, html });
  }
}

module.exports = EmailService;
