import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmationMail(user: any): Promise<void> {
    const url = `${process.env.API_HOST}/api/user/activate/${user.activation_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      template: './templates/confirmation',
      subject: 'Welcome to Term-Payment App Please confirm your email',
      context: {
        name: user.first_name,
        newUrl: url
      },
    });
  }
}
