import { Inject, Injectable, Logger } from '@nestjs/common';
import { AlertStrategy } from './alert.strategy.interface';

import { LmdbService } from '@app/lmdb/lmdb.service';
import { WebHookURLLost } from '@infrastructure/exception/alert';
import { FilteredException } from '@infrastructure/types/type';
import { EmbedBuilder, WebhookClient, blockQuote } from 'discord.js';
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
import { ALERT_OPTION } from './alert.token';
import { AlertWebhookOption, AvailableStrategies } from './type';

@Injectable()
export class DiscordStrategyService implements AlertStrategy {
  private webHookClient: WebhookClient;
  private logger = new Logger('Discord Alert');
  private unknown = 'UNKNOWN';

  constructor(
    @Inject(ALERT_OPTION) private readonly option: AlertWebhookOption,
    private readonly lmdb: LmdbService,
  ) {
    if (!option.webhookURL) {
      throw new WebHookURLLost();
    }
    this.webHookClient = new WebhookClient({
      url: this.option.webhookURL,
    });
  }

  async sendError(message: FilteredException, error: Error): Promise<void> {
    try {
      const embed = await this.getEmbed(message);
      await this.webHookClient.send({ embeds: [embed] });
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async getEmbed(message: FilteredException): Promise<EmbedBuilder> {
    return new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle(alertTitle)
      .setURL(alertTitleHyperlink)
      .setDescription(alertDescription)
      .setThumbnail(alertThumbnail)
      .addFields(
        {
          name: alertErrorEndpoint,
          value: `${message.endpoint ? message.endpoint : this.unknown}`,
          inline: true,
        },
        {
          name: alertStatusCode,
          value: `${message.statusCode ? message.statusCode : this.unknown} (${
            message.errorCode ? message.errorCode : this.unknown
          })`,
          inline: true,
        },
        {
          name: alertTimestamp,
          value: getTimeOfNow(),
          inline: false,
        },
        {
          name: alertErrorMessage,
          value:
            typeof message?.message === 'object'
              ? JSON.stringify(message?.message)
              : message.message
              ? message.message
              : this.unknown,
          inline: false,
        },
        {
          name: alertStackTrace,
          value: message?.stackTrace
            ? blockQuote(message.stackTrace)
            : this.unknown,
          inline: false,
        },
      )
      .setFooter({
        text: alertFooterText,
        iconURL: alertFooterIconURL,
      });
  }

  getStrategy(): AvailableStrategies {
    return 'discord';
  }
}
