// Standard Packages
import { Inject, Injectable, Logger } from '@nestjs/common';

// Third-party Packages
import { SendMailOptions, createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

// Custom Packages
import { MAIL_OPTION } from './mail.token';
import { MailModuleOption, SendOption } from './type';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);
  private transport: Mail;
  private static transportConfig = {
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: true,
    requireTLS: true,
  };

  constructor(@Inject(MAIL_OPTION) private readonly option: MailModuleOption) {
    if (!option?.gmailID || !option.gmailPW) {
      throw new Error('ID and PW is required for MailModule');
    }
    this.transport = createTransport({
      service: MailService.transportConfig.service,
      port: MailService.transportConfig.port,
      host: MailService.transportConfig.host,
      secure: MailService.transportConfig.secure,
      requireTLS: MailService.transportConfig.requireTLS,
      auth: {
        user: option.gmailID,
        pass: option.gmailPW,
      },
    });
  }

  async sendMail(option: SendOption) {
    try {
      const sendOption: SendMailOptions = {
        from: this.option.gmailID,
        to: option.to,
        subject: option.subject,
        html: option.content,
      };
      await this.transport.sendMail(sendOption);
    } catch (err) {
      this.logger.error((err as Error)?.message);
    }
  }

  async sendMailBatch(options: SendOption[]) {
    await Promise.all(
      options.map((option) => {
        return this.sendMail(option);
      }),
    );
  }
}
