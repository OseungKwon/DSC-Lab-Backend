import { Inject, Injectable, Logger } from '@nestjs/common';
import { AlertStrategy } from './alert.strategy.interface';

import { EmbedBuilder, WebhookClient } from 'discord.js';
import { WebHookURLLost } from '@infrastructure/exception/alert';
import { FilteredException } from '@infrastructure/types/type';
import { ALERT_TOKEN } from './alert.token';

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
      .setColor(0x77b5fe)
      .setTitle('Hongik Univ. DSC Server Alert')
      .setURL('https://github.com/J-hoplin1/DSC-Lab-Backend')
      .setDescription(
        '서버 에러 메세지 알림입니다. 관리자에게 이 메세지를 보여주세요',
      )
      .setThumbnail(
        'https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/334766267_5384043541696329_5186981967087625133_n.jpg?stp=dst-jpg_p526x296&_nc_cat=101&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=r4StzZ6-7OoAX97e48j&_nc_ht=scontent-ssn1-1.xx&oh=00_AfAL5K5HS9ru9328KWLc2zVrbWucuzIJEyACgGMKis9g0A&oe=64F7ADFF',
      )
      .addFields(
        {
          name: 'Error Endpoint',
          value: `${message.endpoint ? message.endpoint : this.unknown}`,
          inline: true,
        },
        {
          name: 'Status Code',
          value: `${message.statusCode ? message.endpoint : this.unknown}`,
          inline: true,
        },
        {
          name: 'Error Message',
          value:
            typeof message?.message === 'object'
              ? JSON.stringify(message?.message)
              : message.message
              ? message.message
              : this.unknown,
          inline: false,
        },
      )
      .setTimestamp()
      .setFooter({
        text: 'Developed by Hoplin',
        iconURL: 'https://avatars.githubusercontent.com/u/45956041?v=4',
      });
  }
}
