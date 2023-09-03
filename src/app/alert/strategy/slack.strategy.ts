import { IncomingWebhook } from '@slack/webhook';
import { AlertStrategy } from './alert.strategy.interface';
import { Injectable, Inject } from '@nestjs/common';
import { FilteredException } from '@infrastructure/types/type';
import { ALERT_TOKEN } from './alert.token';
import { MessageAttachment } from '@slack/types';
import {
  alertDescription,
  alertErrorEndpoint,
  alertErrorMessage,
  alertFooterIconURL,
  alertFooterText,
  alertStatusCode,
  alertThumbnail,
  alertTimestamp,
  alertTitle,
  alertTitleHyperlink,
} from './alert.message';

@Injectable()
export class SlackStrategyService implements AlertStrategy {
  private webhook: IncomingWebhook;
  private unknown = 'UNKNOWN';
  constructor(@Inject(ALERT_TOKEN) private readonly webHookURL: string) {
    this.webhook = new IncomingWebhook(this.webHookURL);
  }

  async send(message: FilteredException): Promise<void> {
    const attachment = this.getAttachement(message);
    await this.webhook.send({ attachments: [attachment] });
  }

  private getAttachement(message: FilteredException): MessageAttachment {
    const attachement: MessageAttachment = {
      mrkdwn_in: ['text'],
      color: 'danger',
      title: alertTitle,
      title_link: alertTitleHyperlink,
      thumb_url: alertThumbnail,
      text: alertDescription,
      fields: [
        {
          title: alertErrorEndpoint,
          value: `${message.endpoint ? message.endpoint : this.unknown}`,
          short: true,
        },
        {
          title: alertStatusCode,
          value: `${message.statusCode ? message.statusCode : this.unknown}(${
            message.errorCode ? message.errorCode : this.unknown
          })`,
          short: true,
        },
        {
          title: alertTimestamp,
          value: new Date().toLocaleString(),
          short: false,
        },
        {
          title: alertErrorMessage,
          value:
            typeof message?.message === 'object'
              ? JSON.stringify(message?.message)
              : message.message
              ? message.message
              : this.unknown,
          short: false,
        },
      ],
      footer: alertFooterText,
      footer_icon: alertFooterIconURL,
    };
    return attachement;
  }
}
