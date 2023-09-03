import { Inject, Injectable, Logger } from '@nestjs/common';
import { AlertStrategy } from './alert.strategy.interface';

import { EmbedBuilder, WebhookClient } from 'discord.js';
import { FilteredException } from '@infrastructure/types/type';
import { ALERT_TOKEN } from './alert.token';
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
export class DiscordStrategyService implements AlertStrategy {
  private webHookClient: WebhookClient;
  private logger = new Logger('Discord Alert');
  private unknown = 'UNKNOWN';

  constructor(@Inject(ALERT_TOKEN) private readonly webHookURL: string) {
    this.webHookClient = new WebhookClient({
      url: this.webHookURL,
    });
  }

  async send(message: FilteredException): Promise<void> {
    try {
      const embed = await this.getEmbed(message);
      await this.webHookClient.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
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
          value: `${message.statusCode ? message.statusCode : this.unknown}(${
            message.errorCode ? message.errorCode : this.unknown
          })`,
          inline: true,
        },
        {
          name: alertTimestamp,
          value: new Date().toLocaleString(),
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
      )
      .setFooter({
        text: alertFooterText,
        iconURL: alertFooterIconURL,
      });
  }
}
