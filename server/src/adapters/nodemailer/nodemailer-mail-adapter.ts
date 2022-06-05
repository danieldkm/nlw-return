import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "435909bee1513b",
    pass: "54468ded988d7c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Daniel Morita <danielkeyti@gmail.com>',
      subject,
      html: body,
    });
  }
}
