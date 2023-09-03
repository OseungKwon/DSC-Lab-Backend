import { FilteredException } from '@infrastructure/types/type';
import { AlertStrategy } from './alert.strategy.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  EMAIL_PASSWORD_TOKEN,
  EMAIL_SERVICE_TOKEN,
  EMAIL_TO_TOKEN,
  EMAIL_USER_TOKEN,
} from './alert.token';
import { AvailableMailService, MailTransportConfig } from './type';
import mail, { SendMailOptions, createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {
  alertDescription,
  alertErrorEndpoint,
  alertErrorMessage,
  alertStatusCode,
  alertTimestamp,
  alertTitle,
  alertTitleHyperlink,
} from './alert.message';

@Injectable()
export class EmailStrategyService implements AlertStrategy {
  private transport: Mail;
  private unknown = 'UNKNOWN';
  private logger = new Logger('Mail Alert');
  private static transportConfigMapper: MailTransportConfig = {
    gmail: {
      port: 587,
      host: 'smtp.gmail.com',
      secure: true,
      requireTLS: true,
    },
  };
  constructor(
    @Inject(EMAIL_TO_TOKEN) private readonly to: string,
    @Inject(EMAIL_SERVICE_TOKEN) private readonly service: AvailableMailService,
    @Inject(EMAIL_USER_TOKEN) private readonly user: string,
    @Inject(EMAIL_PASSWORD_TOKEN) private readonly pass: string,
  ) {
    const transportConfig = EmailStrategyService.transportConfigMapper[service];
    this.transport = createTransport({
      service,
      port: transportConfig.port,
      host: transportConfig.host,
      secure: transportConfig.secure,
      requireTLS: transportConfig.requireTLS
        ? transportConfig.requireTLS
        : false,
      auth: {
        user,
        pass: pass,
      },
    });
  }
  async send(message: FilteredException): Promise<void> {
    try {
      const sendOption: SendMailOptions = {
        from: this.user,
        to: this.to,
        subject: 'Hongik Univ. DSC Server Alert',
        html: this.getHTML(message),
      };
      await this.transport.sendMail(sendOption);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private getHTML(message: FilteredException): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Email Subject</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #333;"><a href="${alertTitleHyperlink}">${alertTitle}</a>,</h1>
        <p style="color: #555;">${alertDescription}</p>
        <p style="color: #555;">${alertErrorEndpoint} : ${
      message.endpoint ? message.endpoint : this.unknown
    }</p>
        <p style="color: #555;">${alertStatusCode} : ${
      message.statusCode ? message.statusCode : this.unknown
    }(${message.errorCode ? message.errorCode : this.unknown})</p>
        <p style="color: #555;">${alertErrorMessage} : ${
      typeof message?.message === 'object'
        ? JSON.stringify(message?.message)
        : message.message
        ? message.message
        : this.unknown
    }</p>
        <p style="color: #555;">${alertTimestamp} : ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>`;
  }
}
