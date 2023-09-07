import { FilteredException } from '@infrastructure/types/type';
import { AlertStrategy } from './alert.strategy.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ALERT_OPTION } from './alert.token';
import { AlertMailOption, MailTransportConfig } from './type';
import { SendMailOptions, createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {
  alertDescription,
  alertErrorEndpoint,
  alertErrorMessage,
  alertStackTrace,
  alertStatusCode,
  alertTimestamp,
  alertTitle,
  alertTitleHyperlink,
  getTimeOfNow,
} from './alert.message';
import { EmailInformationLost } from '@infrastructure/exception/alert';

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
  constructor(@Inject(ALERT_OPTION) private readonly option: AlertMailOption) {
    if (!(option.to || option.auth.password || option.auth.user)) {
      throw new EmailInformationLost();
    }
    const transportConfig =
      EmailStrategyService.transportConfigMapper[option.service];
    this.transport = createTransport({
      service: option.service,
      port: transportConfig.port,
      host: transportConfig.host,
      secure: transportConfig.secure,
      requireTLS: transportConfig.requireTLS
        ? transportConfig.requireTLS
        : false,
      auth: {
        user: option.auth.user,
        pass: option.auth.password,
      },
    });
  }
  async send(message: FilteredException): Promise<void> {
    try {
      const sendOption: SendMailOptions = {
        from: this.option.auth.user,
        to: this.option.to,
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
    } (${message.errorCode ? message.errorCode : this.unknown})</p>
        <p style="color: #555;">${alertErrorMessage} : ${
      typeof message?.message === 'object'
        ? JSON.stringify(message?.message)
        : message.message
        ? message.message
        : this.unknown
    }</p>
        <p style="color: #555;">${alertTimestamp} : ${getTimeOfNow()}</p>
        <p style="color: #555;">${alertStackTrace}</p>
        <code>
          ${message.stackTrace ? message.stackTrace : this.unknown}
        </code>
    </div>
</body>
</html>`;
  }
}
