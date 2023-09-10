import { WebHookURLLost } from '@infrastructure/exception/alert';
import { FilteredException } from '@infrastructure/types/type';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MessageAttachment } from '@slack/types';
import { IncomingWebhook } from '@slack/webhook';
import {
  alertDescription,
  alertErrorEndpoint,
  alertErrorMessage,
  alertFooterIconURL,
  alertFooterText,
  alertStackTrace,
  alertStatusCode,
  alertThumbnail,
  alertTimestamp,
  alertTitle,
  alertTitleHyperlink,
  getTimeOfNow,
} from './alert.message';
import { AlertStrategy } from './alert.strategy.interface';
import { ALERT_OPTION } from './alert.token';
import { AlertWebhookOption, AvailableStrategies } from './type';
import { LmdbService } from '@app/lmdb/lmdb.service';

@Injectable()
export class SlackStrategyService implements AlertStrategy {
  private webhook: IncomingWebhook;
  private unknown = 'UNKNOWN';
  private logger = new Logger('Slack Alert');

  constructor(
    @Inject(ALERT_OPTION) private readonly option: AlertWebhookOption,
    private readonly lmdb: LmdbService,
  ) {
    if (!option.webhookURL) {
      throw new WebHookURLLost();
    }
    this.webhook = new IncomingWebhook(this.option.webhookURL);
  }

  async sendError(message: FilteredException, error: Error): Promise<void> {
    try {
      const attachment = this.getAttachement(message);
      await this.webhook.send({ attachments: [attachment] });
    } catch (err) {
      this.logger.error(err);
    }
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
          value: `${message.statusCode ? message.statusCode : this.unknown} (${
            message.errorCode ? message.errorCode : this.unknown
          })`,
          short: true,
        },
        {
          title: alertTimestamp,
          value: getTimeOfNow(),
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
        {
          title: alertStackTrace,
          value: message.stackTrace
            ? `\`\`\`${message.stackTrace}\`\`\``
            : this.unknown,
          short: false,
        },
      ],
      footer: alertFooterText,
      footer_icon: alertFooterIconURL,
    };
    return attachement;
  }

  getStrategy(): AvailableStrategies {
    return 'slack';
  }
}
